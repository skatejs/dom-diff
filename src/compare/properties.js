import * as types from '../types';

export default function (src, dst) {
  // We only use destination prop specs since it could be a vDOM.
  let srcProps = src.properties || src;
  let dstProps = dst.properties;
  let instructions = [];

  // Bail early if possible.
  if (!dstProps) {
    return instructions;
  }

  // We use the destination prop spec as the source of truth.
  for (let a in dstProps) {
    let srcProp = srcProps[a];
    let dstProp = dstProps[a];

    if (srcProp !== dstProp) {
      instructions.push({
        data: { name: a, value: dstProp },
        destination: dst,
        source: src,
        type: types.SET_PROPERTY
      });
    }
  }

  return instructions;
}
