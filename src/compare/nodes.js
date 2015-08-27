'use strict';

import compareNode from './node';

export default function (childNodes, child) {
  let childNodesLength = childNodes.length;
  for (let a = 0; a < childNodesLength; a++) {
    let instructions = compareNode(childNodes[a], child);
    if (instructions) {
      return {
        index: a,
        instructions: instructions
      };
    }
  }
  return {
    index: -1,
    instructions: null
  };
}
