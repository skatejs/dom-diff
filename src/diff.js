import * as types from './types';
import compareNode from './compare/node';

export default function diff (opts = {}) {
  let src = opts.source;
  let dst = opts.destination;
  let instructions = [];

  if (!src || !dst) {
    return [];
  }

  let srcChs = src.childNodes;
  let dstChs = dst.childNodes;
  let srcChsLen = srcChs ? srcChs.length : 0;
  let dstChsLen = dstChs ? dstChs.length : 0;

  for (let a = 0; a < dstChsLen; a++) {
    let curSrc = srcChs[a];
    let curDst = dstChs[a];

    // If there is no matching destination node it means we need to remove the
    // current source node from the source.
    if (!curSrc) {
      instructions.push({
        destination: dstChs[a],
        source: src,
        type: types.APPEND_CHILD
      });
      continue;
    } else {
      // Ensure the real node is carried over even if the destination isn't used.
      // This is used in the render() function to keep track of the real node
      // that corresponds to a virtual node if a virtual tree is being used.
      curDst.__realNode = curSrc.__realNode;
    }

    let nodeInstructions = compareNode(curSrc, curDst);

    // If there are instructions (even an empty array) it means the node can be
    // diffed and doesn't have to be replaced. If the instructions are falsy
    // it means that the nodes are not similar (cannot be changed) and must be
    // replaced instead.
    if (nodeInstructions) {
      const newOpts = opts;
      newOpts.destination = curDst;
      newOpts.source = curSrc;
      instructions = instructions.concat(nodeInstructions, diff(newOpts));
    } else {
      instructions.push({
        destination: curDst,
        source: curSrc,
        type: types.REPLACE_CHILD
      });
    }
  }

  if (dstChsLen < srcChsLen) {
    for (let a = dstChsLen; a < srcChsLen; a++) {
      instructions.push({
        destination: srcChs[a],
        source: src,
        type: types.REMOVE_CHILD
      });
    }
  }

  return instructions;
}
