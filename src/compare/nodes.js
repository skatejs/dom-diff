'use strict';

import compareNode from './node';

export default function (childNodes, child) {
  let childNodesLength = childNodes.length;
  let similarMatch;

  for (let a = 0; a < childNodesLength; a++) {
    let instructions = compareNode(childNodes[a], child);

    // Falsy instructions means no match at all.
    if (!instructions) {
      continue;
    }

    // Some instructions means partial match. We only record the first match
    // but continue looking for an exact match.
    if (!similarMatch && instructions.length) {
      similarMatch = {
        index: a,
        instructions: instructions
      };
      continue;
    }

    // Instructions array with no instructions means exact match.
    if (instructions.length === 0) {
      return {
        index: a,
        instructions: instructions
      };
    }
  }

  // We record
  if (similarMatch) {
    return similarMatch;
  }

  return {
    index: -1,
    instructions: null
  };
}
