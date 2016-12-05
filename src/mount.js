import toDom from './to-dom';

export default function (tree, elem) {
  elem = elem || document.createElement('div');
  elem.innerHTML = '';
  elem.appendChild(toDom(tree));
  return elem;
}
