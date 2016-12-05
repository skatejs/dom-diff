import compareElement from './element';
import compareText from './text';

const NODE_ELEMENT = 1;
const NODE_TEXT = 3;

export default function (src, dst) {
  let dstType, srcType;

  if (!dst || !src) {
    return;
  }

  dstType = dst.nodeType;
  srcType = src.nodeType;

  if (dstType !== srcType) {
    return;
  } else if (dstType === NODE_ELEMENT) {
    return compareElement(src, dst);
  } else if (dstType === NODE_TEXT) {
    return compareText(src, dst);
  }
}
