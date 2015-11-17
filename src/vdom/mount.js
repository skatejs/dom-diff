import dom from './vdom/dom';

export default function (elem, tree) {
  while (elem.firstChild) elem.firstChild.remove();
  elem.appendChild(dom(tree));
}
