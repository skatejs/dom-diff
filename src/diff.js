import * as types from './types';
import assign from 'lodash/object/assign';
import compareNode from './compare/node';

export default function diff (opts) {
  if (opts.descend === undefined) {
    opts.descend = () => true;
  }

  let dst = opts.destination;
  let src = opts.source;
  let instructions = [];

  if (!src || !dst) {
    return [];
  }

  let less;
  let more;

  if (dst.childNodes.length < src.childNodes.length) {
    less = dst;
    more = src;
  } else {
    less = src;
    more = dst;
  }

  let moreStartIndex = 0;

  // Diff the node with less items against the node with more items.
  for (let a = 0; a < less.childNodes.length; a++) {
    let curLess = less.childNodes[a];
    let curMore = more.childNodes[a];
    let curDst = less === dst ? less.childNodes[a] : more.childNodes[a];
    let curSrc = more === src ? more.childNodes[a] : less.childNodes[a];
    let nodeInstructions = compareNode(curSrc, curDst);

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

    ++moreStartIndex;
  }

  // Add / remove extra items.
  for (let a = moreStartIndex; a < more.childNodes.length; a++) {
    if (more === dst) {
      instructions.push({
        destination: more.childNodes[a],
        source: less,
        type: types.APPEND_CHILD
      });
    } else {
      instructions.push({
        destination: more.childNodes[a],
        source: more,
        type: types.REMOVE_CHILD
      });
    }
  }

  return instructions;
}
