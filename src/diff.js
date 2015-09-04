import * as types from './types';
import assign from 'lodash/object/assign';
import compareNode from './compare/node';

export default function diff (opts) {
  if (opts.descend === undefined) {
    opts.descend = () => true;
  }

  let src = opts.source;
  let dst = opts.destination;
  let instructions = [];

  if (!src || !dst) {
    return [];
  }

  let srcChs = src.childNodes;
  let dstChs = dst.childNodes;
  let srcChsLen = srcChs.length;
  let dstChsLen = dstChs.length;

  // Diff the node with less items against the node with more items.
  for (let a = 0; a < srcChsLen; a++) {
    let curSrc = srcChs[a];
    let curDst = dstChs[a];
    let nodeInstructions = compareNode(curSrc, curDst);

    // If there is no matching destination node it means we need to remove the
    // current source node from the source.
    if (!curDst) {
      instructions.push({
        destination: curSrc,
        source: src,
        type: types.REMOVE_CHILD
      });
      continue;
    }

    // If there are instructions (even an empty array) it means the node can be
    // diffed and doesn't have to be replaced. If the instructions are falsy
    // it means that the nodes are not similar (cannot be changed) and must be
    // replaced instead.
    if (nodeInstructions) {
      instructions = instructions.concat(nodeInstructions);
      if (opts.descend(curSrc, curDst)) {
        instructions = instructions.concat(diff(assign(opts, {
          destination: curDst,
          source: curSrc
        })));
      }
    } else {
      instructions.push({
        destination: curDst,
        source: curSrc,
        type: types.REPLACE_CHILD
      });
    }
  }

  if (srcChsLen < dstChsLen) {
    for (let a = srcChsLen; a < dstChsLen; a++) {
      instructions.push({
        destination: dstChs[a],
        source: src,
        type: types.APPEND_CHILD
      });
    }
  }

  return instructions;
}
