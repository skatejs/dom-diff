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

    // Create a new element to house the new tree since we diff fragments.
    const newTree = createElement('div', null, render(elem, { createElement }));
    if (elem.__oldTree) {
      merge({
        destination: newTree,
        source: elem.__oldTree
      });
    } else {
      mount(elem, newTree.childNodes[0]);
    }
    elem.__oldTree = newTree;
  };
}
