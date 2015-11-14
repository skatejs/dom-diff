import * as types from './types';
import compareNode from './compare/node';

function diff (opts = defaultOptions) {
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
    }

    if (opts.ignore && opts.ignore(curSrc, curDst)) {
      continue;
    }

    let nodeInstructions = compareNode(curSrc, curDst);

    // If there are instructions (even an empty array) it means the node can be
    // diffed and doesn't have to be replaced. If the instructions are falsy
    // it means that the nodes are not similar (cannot be changed) and must be
    // replaced instead.
    if (nodeInstructions) {
      instructions = instructions.concat(nodeInstructions);
      if (!curSrc.__DO_NOT_DESCEND && (!opts.descend || opts.descend(curSrc, curDst))) {
        const newOpts = opts;
        newOpts.destination = curDst;
        newOpts.source = curSrc;
        instructions = instructions.concat(diff(newOpts));
      }
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

export default function (opts) {
  // We don't descend into any root nodes that have already been diffed.
  opts.source.__DO_NOT_DESCEND = true;
  return diff(opts);
}
