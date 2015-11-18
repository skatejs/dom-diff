import debounce from 'debounce';
import createElement from './vdom/element';
import merge from './merge';
import mount from './vdom/mount';

const { Node } = window;

export default function (render) {
  return function (elem) {
    elem = elem instanceof Node ? elem : this;

    if (!elem instanceof Node) {
      throw new Error('No node provided to diff renderer as either the first argument or the context.');
    }

    if (!elem.__debouncedRender) {
      elem.__debouncedRender = debounce(function (elem) {
        const newTree = render(elem, { createElement });
        if (elem.__oldTree) {
          merge({
            destination: newTree,
            source: elem.__oldTree
          });
        } else {
          mount(elem, newTree);
        }
        elem.__oldTree = newTree;
      });
    }
    elem.__debouncedRender(elem);
  };
}
