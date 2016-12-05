import WeakMap from './util/weak-map';
import merge from './merge';
import mount from './mount';

const { Node } = window;
const oldTreeMap = new WeakMap();

export default function (render) {
  return function (elem, done) {
    elem = elem instanceof Node ? elem : this;

    if (!(elem instanceof Node)) {
      throw new Error('No node provided to diff renderer as either the first argument or the context.');
    }

    // Create a new element to house the new tree since we diff / mount fragments.
    const newTree = render(elem);
    const oldTree = oldTreeMap.get(elem);

    if (oldTree) {
      merge({
        destination: newTree,
        source: oldTree,
        done
      });
    } else {
      mount(newTree, elem);
      if (typeof done === 'function') {
        done();
      }
    }

    oldTreeMap.set(elem, newTree);
  };
}
