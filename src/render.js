import debounce from 'debounce';
import createElement from './vdom/element';
import dom from './vdom/dom';
import merge from './merge';

export default function (render) {
  return function (elem) {
    if (!elem.__debouncedRender) {
      elem.__debouncedRender = debounce(function (elem) {
        const newTree = render(elem, { createElement });
        if (elem.__oldTree) {
          merge({
            destination: newTree,
            source: elem.__oldTree
          });
        } else {
          while (elem.firstChild) elem.firstChild.remove();
          elem.appendChild(dom(newTree));
        }
        elem.__oldTree = newTree;
      });
    }
    elem.__debouncedRender(elem);
  };
}
