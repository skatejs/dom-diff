import * as types from '../types';

export default function (src, dst) {
  let srcAttrs = src.attributes;
  let dstAttrs = dst.attributes;
  let srcAttrsLen = (srcAttrs || 0) && srcAttrs.length;
  let dstAttrsLen = (dstAttrs || 0) && dstAttrs.length;
  let instructions = [];

  // Bail early if possible.
  if (!srcAttrsLen && !dstAttrsLen) {
    return instructions;
  }

  // Merge attributes that exist in source with destination's.
  for (let a = 0; a < srcAttrsLen; a++) {
    let srcAttr = srcAttrs[a];
    let dstAttr = dstAttrs[srcAttr.name];

    if (!dstAttr) {
      instructions.push({
        data: { name: srcAttr.name },
        destination: dst,
        source: src,
        type: types.REMOVE_ATTRIBUTE
      });
    } else if (srcAttr.value !== dstAttr.value) {
      instructions.push({
        data: { name: srcAttr.name, value: dstAttr.value },
        destination: dst,
        source: src,
        type: types.SET_ATTRIBUTE
      });
    }
  }

  // We only need to worry about setting attributes that don't already exist
  // in the source.
  for (let a = 0; a < dstAttrsLen; a++) {
    let dstAttr = dstAttrs[a];
    let srcAttr = srcAttrs[dstAttr.name];

    if (!srcAttr) {
      instructions.push({
        data: { name: dstAttr.name, value: dstAttr.value },
        destination: dst,
        source: src,
        type: types.SET_ATTRIBUTE
      });
    }
  }

  return instructions;
}
