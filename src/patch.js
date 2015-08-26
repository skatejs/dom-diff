'use strict';

import * as types from './types';

let patchers = {};
patchers[types.APPEND_CHILD] = function (src, dst) {
  src.appendChild(dst);
};
patchers[types.INSERT_BEFORE] = function (src, dst) {
  src.parentNode.insertBefore(dst, src);
};
patchers[types.MOVE_TO] = function (src, dstIndex) {
  let dst = src.parentNode.childNodes[dstIndex];

  if (dst === src) {
    return;
  }

  console.log(dstIndex + ': ' + src.parentNode.innerHTML);

  if (dst) {
    console.log(src.outerHTML + ' will go before ' + dst.outerHTML);
    src.parentNode.insertBefore(src, dst);
  } else {
    console.log(src.outerHTML + ' will be appended');
    src.parentNode.appendChild(src);
  }
};
patchers[types.REMOVE_CHILD] = function (src) {
  src.parentNode.removeChild(src);
};
patchers[types.REPLACE_CHILD] = function (src, dst) {
  src.parentNode.replaceChild(dst, src);
};
patchers[types.TEXT_CONTENT] = function (src, dst) {
  src.textContent = dst.textContent;
};

function patch (instruction) {
  patchers[instruction.type](instruction.source, instruction.destination);
}

export default function (instructions) {
  instructions.forEach(patch);
}
