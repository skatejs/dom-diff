import * as types from '../types';

function formatAttributes (attrs) {
  if (typeof attrs === 'object' && typeof attrs.length === 'undefined') {
    return attrs;
  }
  const obj = {};
  const len = attrs.length;
  for (let a = 0; a < len; a++) {
    const att = attrs[a];
    obj[att.name] = att.value;
  }
  return obj;
}

export default function (src, dst) {
  const srcAttrs = formatAttributes(src.attributes);
  const dstAttrs = formatAttributes(dst.attributes);
  const instructions = [];

  // Merge attributes that exist in source with destination's.
  for (let name in srcAttrs) {
    if (name in dstAttrs) {
      instructions.push({
        data: { name, value: dstAttrs[name] },
        destination: dst,
        source: src,
        type: types.SET_ATTRIBUTE
      });
    } else {
      instructions.push({
        data: { name },
        destination: dst,
        source: src,
        type: types.REMOVE_ATTRIBUTE
      });
    }
  }

  // We only need to worry about setting attributes that don't already exist
  // in the source.
  for (let name in dstAttrs) {
    instructions.push({
      data: { name, value: dstAttrs[name] },
      destination: dst,
      source: src,
      type: types.SET_ATTRIBUTE
    });
  }

  return instructions;
}
