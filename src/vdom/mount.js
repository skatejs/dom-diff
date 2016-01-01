import dom from './dom';

export default function (elem, tree) {
  const content = elem;
  while (content.firstChild) {
    const first = content.firstChild;
    first.parentNode.removeChild(first);
  }
  content.appendChild(dom(tree));
}
