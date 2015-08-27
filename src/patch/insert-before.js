'use strict';

export default function (src, dst) {
  src.parentNode.insertBefore(dst, src);
}
