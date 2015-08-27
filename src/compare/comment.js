'use strict';

export default function (src, dst) {
  if (src.textContent !== dst.textContent) {
    return false;
  }
}
