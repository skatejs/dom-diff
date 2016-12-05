import * as types from '../types';

export default function (src, dst) {
  const { properties: srcProps } = src;
  const { properties: dstProps } = dst;
  const instructions = [];

  for (let name in srcProps) {
    const srcValue = srcProps[name];
    const dstValue = dstProps[name];
    if (srcValue !== dstValue) {
      instructions.push({
        data: { name },
        destination: dst,
        source: src,
        type: types.SET_PROPERTY
      });
    }
  }

  for (let name in dstProps) {
    const srcValue = srcProps[name];
    const dstValue = dstProps[name];
    if (srcValue !== dstValue) {
      instructions.push({
        data: { name },
        destination: dst,
        source: src,
        type: types.SET_PROPERTY
      });
    }
  }

  return instructions;
}
