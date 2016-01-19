import dom from './dom';

function removeChildNodes (elem) {
  while (elem.firstChild) {
    const first = elem.firstChild;
    first.parentNode.removeChild(first);
  }
}

export default function (elem, tree) {
  removeChildNodes(elem);
  elem.appendChild(dom(tree));
}
