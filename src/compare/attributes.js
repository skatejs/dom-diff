import * as types from '../types';
import { getAccessor } from '../util/accessor';

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
    const srcAttr = srcAttrs[a];
    const srcAttrName = srcAttr.name;
    const srcAttrValue = getAccessor(src, srcAttrName);
    const dstAttr = dstAttrs[srcAttrName];
    const dstAttrValue = getAccessor(dst, srcAttrName);

    if (!dstAttr) {
      instructions.push({
        data: { name: srcAttrName },
        destination: dst,
        source: src,
        type: types.REMOVE_ATTRIBUTE
      });
    } else if (srcAttrValue !== dstAttrValue) {
      instructions.push({
        data: { name: srcAttrName, value: dstAttrValue },
        destination: dst,
        source: src,
        type: types.SET_ATTRIBUTE
      });
    }
  }

  // We only need to worry about setting attributes that don't already exist
  // in the source.
  for (let a = 0; a < dstAttrsLen; a++) {
    const dstAttr = dstAttrs[a];
    const dstAttrName = dstAttr.name;
    const dstAttrValue = getAccessor(dst, dstAttrName);
    const srcAttr = srcAttrs[dstAttrName];

    if (!srcAttr) {
      instructions.push({
        data: { name: dstAttrName, value: dstAttrValue },
        destination: dst,
        source: src,
        type: types.SET_ATTRIBUTE
      });
    }
  }

  return instructions;
}
