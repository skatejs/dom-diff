'use strict';

import * as types from './types';

const NODE_COMMENT = 8;
const NODE_ELEMENT = 1;
const NODE_TEXT = 3;
const KEY_SAME_AS_DESTINATION = Symbol();

function compareNodeElement (src, dst) {
  if (src.tagName !== dst.tagName) {
    return false;
  }
}

function compareNodeText (src, dst) {
  if (src.textContent !== dst.textContent) {
    return false;
  }
}

function compareNodeComment (src, dst) {
  if (src.textContent !== dst.textContent) {
    return false;
  }
}

function isSameNode (src, dst) {
  let dstType, srcType;

  if (!dst || !src) {
    return false;
  }

  dstType = dst.nodeType;
  srcType = src.nodeType;

  if (dstType !== srcType) {
    return false;
  }

  if (dstType === NODE_ELEMENT) {
    return compareNodeElement(src, dst);
  }

  if (dstType === NODE_TEXT) {
    return compareNodeText(src, dst);
  }

  if (dstType === NODE_COMMENT) {
    return compareNodeComment(src, dst);
  }

  // We don't really care about incurring the cost of compareing anything else
  // so by returning true we just assume they're the same.
  return true;
}

function indexOfNode (childNodes, child) {
  let childNodesLength = childNodes.length;
  for (let a = 0; a < childNodesLength; a++) {
    if (isSameNode(childNodes[a], child)) {
      return a;
    }
  }
  return -1;
}

export default function diff (src, dst) {
  let instructions = [];

  if (!dst) {
    return [];
  }

  let dstChs = dst.childNodes;
  let dstChsLen = dstChs.length;
  let dstInSrcMap = [];
  let srcChs = src.childNodes;
  let srcChsLen = srcChs.length;
  let srcInDstMap = [];

  // If there's only one child in both source and destination, we can check to
  // see if they're the same, or replace the source with the destination if not
  // and simply return from here without doing any further operations.
  if (dstChsLen === 1 && srcChsLen === 1) {
    let dstCh = dstChs[0];
    let srcCh = srcChs[0];

    if (isSameNode(srcCh, dstCh)) {
      return [];
    } else {
      return [{
        destination: dstCh,
        source: srcCh,
        type: types.REPLACE_CHILD
      }];
    }
  }

  // Add nodes that don't exist in the source.
  for (let a = 0; a < dstChsLen; a++) {
    let dstCh = dstChs[a];
    let index = indexOfNode(srcChs, dstCh);

    // If they exist in the source, then mark that source node.
    if (index > -1) {
      dstInSrcMap.push(dstCh);
      srcInDstMap.push(srcChs[index]);
      srcChs[index][KEY_SAME_AS_DESTINATION] = true;
    }

    // If there are same nodes, we take the last node that we found and insert
    // after that one. This ensures destination nodes get placed where they're
    // supposed to be rather than just appended.
    else if (srcInDstMap.length) {
      instructions.push({
        destination: dstCh,
        source: srcInDstMap[srcInDstMap.length - 1],
        type: types.INSERT_BEFORE
      });
    }

    // If the destination node doesn't exist in the source node and there are
    // no overlaps yet, we simply append.
    else {
      instructions.push({
        destination: dstCh,
        source: src,
        type: types.APPEND_CHILD
      });
    }
  }

  // Remove any nodes in the source that don't exist in the destination.
  for (let a = 0; a < srcChsLen; a++) {
    let srcCh = srcChs[a];

    // If the source is in the destination, keep it but cleanup the property
    // we added to store some data.
    if (srcCh[KEY_SAME_AS_DESTINATION]) {
      delete srcCh[KEY_SAME_AS_DESTINATION];
    }

    // If the source does not exist in the destination, remove it.
    else {
      instructions.push({
        destination: null,
        source: srcCh,
        type: types.REMOVE_CHILD
      });
    }
  }

  // For the nodes that exist in both diff objects, we diff thier trees.
  let dstInSrcMapLen = dstInSrcMap.length;
  for (let a = 0; a < dstInSrcMapLen; a++) {
    instructions = instructions.concat(diff(srcInDstMap[a], dstInSrcMap[a]));
  }

  return instructions;
}
