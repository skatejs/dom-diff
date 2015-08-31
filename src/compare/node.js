import compareElement from './element';
import compareText from './text';
import compareComment from './comment';

const NODE_COMMENT = 8;
const NODE_ELEMENT = 1;
const NODE_TEXT = 3;

export default function (src, dst) {
  let dstType, srcType, ret;

  if (!dst || !src) {
    return;
  }

  dstType = dst.nodeType;
  srcType = src.nodeType;

  if (dstType !== srcType) {
    return;
  } else if (dstType === NODE_ELEMENT) {
    ret = compareElement(src, dst);
  } else if (dstType === NODE_TEXT) {
    ret = compareText(src, dst);
  } else if (dstType === NODE_COMMENT) {
    ret = compareComment(src, dst);
  }

  return ret;
}
