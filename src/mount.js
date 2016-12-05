import toDom from './to-dom';

function removeChildNodes (elem) {
  while (elem.firstChild) {
    const first = elem.firstChild;
    first.parentNode.removeChild(first);
  }
}

export default function (elem, tree) {
  removeChildNodes(elem);
  elem.appendChild(toDom(tree));
}
