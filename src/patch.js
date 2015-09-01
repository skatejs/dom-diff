import * as types from './types';
import appendChild from './patch/append-child';
import removeAttribute from './patch/remove-attribute';
import removeChild from './patch/remove-child';
import replaceChild from './patch/replace-child';
import setAttribute from './patch/set-attribute';
import textContent from './patch/text-content';

let patchers = {};
patchers[types.APPEND_CHILD] = appendChild;
patchers[types.REMOVE_ATTRIBUTE] = removeAttribute;
patchers[types.REMOVE_CHILD] = removeChild;
patchers[types.REPLACE_CHILD] = replaceChild;
patchers[types.SET_ATTRIBUTE] = setAttribute;
patchers[types.TEXT_CONTENT] = textContent;

function patch (instruction) {
  patchers[instruction.type](instruction.source, instruction.destination, instruction.data);
}

export default function (instructions) {
  instructions.forEach(patch);
}
