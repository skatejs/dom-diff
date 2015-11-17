import debounce from 'debounce';
import createElement from './vdom/element';
import merge from './merge';
import mount from './vdom/mount';

export default function (render) {
  return function (elem) {
    elem = elem || this;
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
