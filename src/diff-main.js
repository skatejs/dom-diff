import * as types from './types';
import compareNode from './compare/node';
import realNode from './util/real-node';
import realNodeMap from './util/real-node-map';

function diffNode (source, destination) {
  let nodeInstructions = compareNode(source, destination);

  // If there are instructions (even an empty array) it means the node can be
  // diffed and doesn't have to be replaced. If the instructions are falsy
  // it means that the nodes are not similar (cannot be changed) and must be
  // replaced instead.
  if (nodeInstructions) {
    return nodeInstructions.concat(diff({ source, destination }));
  }

  return [{
    destination,
    source,
    type: types.REPLACE_CHILD
  }];
}

export default function diff (opts) {
  const src = opts.source;
  const dst = opts.destination;

  if (!src || !dst) {
    return [];
  }

  let instructions = opts.root ? diffNode(src, dst) : [];

  const srcChs = src.childNodes;
  const dstChs = dst.childNodes;
  const srcChsLen = srcChs ? srcChs.length : 0;
  const dstChsLen = dstChs ? dstChs.length : 0;

  for (let a = 0; a < dstChsLen; a++) {
    const curSrc = srcChs[a];
    const curDst = dstChs[a];

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
      if (typeof curDst.__id === 'undefined') {
        realNodeMap.set(curDst.__id, realNode(curSrc));
      }
    }

    instructions = instructions.concat(diffNode(curSrc, curDst));
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
