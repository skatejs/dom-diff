export function getAccessor (node, name) {
  if (name === 'class') {
    return node.className;
  } else if (name === 'style') {
    return node.style.cssText;
  } else if (name !== 'type' && name in node) {
    return node[name];
  } else if (node.getAttribute) {
    return node.getAttribute(name);
  } else if (node.attributes && node.attributes[name]) {
    return node.attributes[name].value;
  }
}

export function mapAccessor (node, name, value) {
  if (name === 'class') {
    node.className = value;
  } else if (name === 'style') {
    node.style = { cssText: value };
  }
}

export function removeAccessor (node, name) {
  if (name === 'class') {
    node.className = '';
  } else if (name === 'style') {
    node.style.cssText = '';
  } else if (name !== 'type' && name in node) {
    node[name] = '';
  } else if (node.removeAttribute) {
    node.removeAttribute(name);
  } else if (node.attributes) {
    delete node.attributes[name];
  }
}

export function setAccessor (node, name, value) {
  if (name === 'class') {
    node.className = value;
  } else if (name === 'style') {
    node.style.cssText = value;
  } else if (name !== 'type' && name in node) {
    node[name] = value;
  } else if (node.setAttribute) {
    node.setAttribute(name, value);
  } else if (node.attributes) {
    node.attributes[node.attributes.length] = node.attributes[name] = { name, value };
  }
}
