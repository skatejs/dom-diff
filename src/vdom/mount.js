import dom from './dom';

function removeChildNodes (content) {
  while (content.firstChild) {
    const first = content.firstChild;
    first.parentNode.removeChild(first);
  }
}

export default function (elem, tree) {
  const content = elem;
  removeChildNodes(content);
  content.appendChild(dom(tree));
}
