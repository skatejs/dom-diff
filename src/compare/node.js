'use strict';

import { KEY_NEW_INDEX } from '../constants';
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

  // Check to see if it's already claimed.
  if (src[KEY_NEW_INDEX] > -1) {
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

  // Specific comparisons must actually return false to notify that the node is
  // not the same. This makes for a simpler internal API where specific
  // comparisons only have to worry about returning false, or an array
  // of instructions.
  if (ret === false) {
    return ret;
  }

  if (!ret) {
    return [];
  }

  return ret;
}
