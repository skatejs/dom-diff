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

  if (dst) {
    src.parentNode.insertBefore(src, dst);
  } else {
    src.parentNode.appendChild(src);
  }
};
patchers[types.REMOVE_ATTRIBUTE] = function (src, dst, data) {
  src.removeAttribute(data.name);
};
patchers[types.REMOVE_CHILD] = function (src) {
  src.parentNode.removeChild(src);
};
patchers[types.REPLACE_CHILD] = function (src, dst) {
  src.parentNode.replaceChild(dst, src);
};
patchers[types.SET_ATTRIBUTE] = function (src, dst, data) {
  src.setAttribute(data.name, dst.getAttribute(data.name));
};
patchers[types.TEXT_CONTENT] = function (src, dst) {
  src.textContent = dst.textContent;
};

function patch (instruction) {
  patchers[instruction.type](instruction.source, instruction.destination, instruction.data);
}

export default function (instructions) {
  instructions.forEach(patch);
}
