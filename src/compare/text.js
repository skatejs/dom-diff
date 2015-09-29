import * as types from '../types';

export default function (src, dst) {
  if (src.textContent === dst.textContent) {
    return [];
  }

  return [{
    destination: dst,
    source: src,
    type: types.TEXT_CONTENT
  }];
}
