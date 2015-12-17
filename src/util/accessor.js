function getAttribute (node, name) {
  const attr = getAttributeObject(node, name);
  return attr && attr.value;
}

function getAttributeObject (node, name) {
  const attrs = node.attributes;
  return attrs && attrs[name];
}

function removeAttribute (node, name) {
  if (node.removeAttribute) {
    node.removeAttribute(name);
  } else {
    const attrs = node.attributes;
    if (attrs) {
      delete attrs[name];
    }
  }
}

function setAttribute (node, name, value) {
  const attr = getAttributeObject(node, name);
  attr && (attr.value = value);
}

export function getAccessor (node, name) {
  if (name === 'class') {
    return node.className;
  } else if (name === 'style') {
    return node.style.cssText;
  } else if (name !=='type' && name in node) {
    return node[name];
  }
  return getAttribute(node, name);
}

export function removeAccessor (node, name) {
  if (name === 'class') {
    node.className = '';
  } else if (name === 'style') {
    node.style.cssText = '';
  } else if (name !== 'type' && name in node) {
    node[name] = '';
  } else {
    removeAttribute(node, name);
  }
}

export function setAccessor (node, name, value) {
  if (name === 'class') {
    node.className = value;
  } else if (name === 'style') {
    node.style.cssText = value;
  } else if (name !=='type' && name in node) {
    node[name] = value;
  } else {
    setAttribute(node, name, value);
  }
}
