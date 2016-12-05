import nodeMap from '../util/node-map';

const { prototype: HTMLElementPrototype } = window.HTMLElement;

export default function (src, dst, data) {
  const { name } = data;
  const node = nodeMap[src.__id];
  const prop = dst.properties[name];

  // Unfurtunately we have to handle style manually.
  if (name === 'style') {
    node.setAttribute('style', '');
    if (typeof prop === 'string') {
      node.style.cssText = prop;
    } else {
      Object.assign(node.style, prop);
    }
  } else if (name in HTMLElementPrototype) {
    if (typeof prop === 'undefined') {
      delete node[name];
    } else {
      node[name] = prop;
    }
  } else {
    node[name] = prop;
  }
}
