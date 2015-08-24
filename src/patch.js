'use strict';

import * as types from './types';

let patchers = {};
patchers[types.APPEND_CHILD] = function (src, dst) {
  src.appendChild(dst);
};
patchers[types.INSERT_BEFORE] = function (src, dst) {
  src.parentNode.insertBefore(dst, src);
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
