'use strict';

import * as types from './types';

const NODE_COMMENT = 8;
const NODE_ELEMENT = 1;
const NODE_TEXT = 3;
const KEY_NEW_INDEX = Symbol();

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
  let dstType, srcType, ret;

  if (!dst || !src) {
    return false;
  }

  // Check to see if it's already claimed.
  if (src[KEY_NEW_INDEX] > -1) {
    return false;
  }

  dstType = dst.nodeType;
  srcType = src.nodeType;

  if (dstType !== srcType) {
    return false;
  } else if (dstType === NODE_ELEMENT) {
    ret = compareNodeElement(src, dst);
  } else if (dstType === NODE_TEXT) {
    ret = compareNodeText(src, dst);
  } else if (dstType === NODE_COMMENT) {
    ret = compareNodeComment(src, dst);
  }

  return ret !== false;
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
    let srcCh = srcChs[a];

    // If the nodes are the same, we add the current key to it so that we can
    // ensure it is still there, or moved to there, when it comes time to
    // ensure postions.
    if (isSameNode(srcCh, dstCh)) {
      dstInSrcMap.push(dstCh);
      srcInDstMap.push(srcCh);
      srcCh[KEY_NEW_INDEX] = a;
      continue;
    }

    // Now try and find in the source.
    let index = indexOfNode(srcChs, dstCh);

    // If the destination is in the source, we add the new key to it so that
    // we can ensure it gets moved to the right spot later.
    if (index > -1) {
      dstInSrcMap.push(dstCh);
      srcInDstMap.push(srcChs[index]);
      srcChs[index][KEY_NEW_INDEX] = a;
      continue;
    }

    // If there are same nodes, we take the last node that we found and insert
    // after that one. This ensures destination nodes get placed where they're
    // supposed to be rather than just appended.
    if (dstInSrcMap.length) {
      let srcToInsertAfter = srcInDstMap[srcInDstMap.length - 1];
      let srcToInsertBefore = srcToInsertAfter.nextSibling;
      instructions.push({
        destination: dstCh,
        source: srcToInsertBefore || src,
        type: srcToInsertBefore ? types.INSERT_BEFORE : types.APPEND_CHILD
      });
      continue;
    }

    // If there are no destination nodes found in the source yet then we
    // append.
    instructions.push({
      destination: dstCh,
      source: srcChsLen ? srcChs[0] : src,
      type: srcChsLen ? types.INSERT_BEFORE : types.APPEND_CHILD
    });
  }

  // Remove any nodes in the source that don't exist in the destination.
  let moves = [];
  for (let a = 0; a < srcChsLen; a++) {
    let srcCh = srcChs[a];

    // The node has moved. We record this so that we can append the moves to
    // the end of the instructions array.
    if (srcCh[KEY_NEW_INDEX] > -1) {
      moves.push({
        destination: srcCh[KEY_NEW_INDEX],
        source: srcCh,
        type: types.MOVE_TO
      });
      delete srcCh[KEY_NEW_INDEX];
      continue;
    }

    // If the source does not exist in the destination, remove it.
    instructions.push({
      destination: null,
      source: srcCh,
      type: types.REMOVE_CHILD
    });
  }

  // Move instructions must come last to ensure that all attachments and
  // detachments have been carried out at this level in the tree. This ensures
  // that the source's length is the same as the destination's length and that
  // indexes where nodes need to be moved is accurate.
  instructions = instructions.concat(moves);

  // For the nodes that exist in both diff objects, we diff thier trees.
  let dstInSrcMapLen = dstInSrcMap.length;
  for (let a = 0; a < dstInSrcMapLen; a++) {
    instructions = instructions.concat(diff(srcInDstMap[a], dstInSrcMap[a]));
  }

  return instructions;
}
