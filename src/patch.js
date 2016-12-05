import * as types from './types';
import appendChild from './patch/append-child';
import removeChild from './patch/remove-child';
import replaceChild from './patch/replace-child';
import setEvent from './patch/set-event';
import setProperty from './patch/set-property';
import textContent from './patch/text-content';

const patchers = {};
patchers[types.APPEND_CHILD] = appendChild;
patchers[types.REMOVE_CHILD] = removeChild;
patchers[types.REPLACE_CHILD] = replaceChild;
patchers[types.SET_EVENT] = setEvent;
patchers[types.SET_PROPERTY] = setProperty;
patchers[types.TEXT_CONTENT] = textContent;

function patch (instruction) {
  patchers[instruction.type](
    instruction.source,
    instruction.destination,
    instruction.data
  );
}

export default function (instructions) {
  instructions.forEach(patch);
}
