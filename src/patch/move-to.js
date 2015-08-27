'use strict';

export default function (src, dstIndex) {
  let dst = src.parentNode.childNodes[dstIndex];

  if (dst === src) {
    return;
  }

  if (dst) {
    src.parentNode.insertBefore(src, dst);
  } else {
    src.parentNode.appendChild(src);
  }
}
