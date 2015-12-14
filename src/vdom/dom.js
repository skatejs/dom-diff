function createElement (el) {
  const realNode = document.createElement(el.tagName);
  const attributes = el.attributes;
  const events = el.events;
  const properties = el.properties;

  if (attributes) {
    const attributesLen = attributes.length;
    for (let a = 0; a < attributesLen; a++) {
      const attr = attributes[a];
      const name = attr.name;
      const value = attr.value;
      realNode.setAttribute(name, value);
    }
  }

  if (events) {
    for (let name in events) {
      const handler = events[name];
      if (typeof handler === 'function') {
        // This is a hack, but there's no way to get a handler for a specific
        // event bound to an element so we have to store the handler on it so
        // that the patcher can later unbind it when setting a new event
        // listener when / if the value changes.
        realNode[`__events_${name}`] = handler;
        realNode.addEventListener(name, handler);
      }
    }
  }

  if (properties) {
    for (let name in properties) {
      const value = properties[name];
      if (name === 'content') {
        if (Array.isArray(value)) {
          value.forEach(ch => realNode.appendChild(render(ch)));
        } else {
          realNode.appendChild(render(value));
        }
      } else if (typeof value !== 'undefined') {
        realNode[name] = value;
      }
    }
  }

  if (el.childNodes) {
    const frag = document.createDocumentFragment();

    for (let a = 0; a < el.childNodes.length; a++) {
      const ch = el.childNodes[a];
      if (ch) {
        frag.appendChild(render(ch));
      }
    }

    if (realNode.hasOwnProperty('content')) {
      realNode.content = frag;
    } else {
      realNode.appendChild(frag);
    }
  }

  return realNode;
}

function createText (el) {
  return document.createTextNode(el.textContent);
}

export default function render (el) {
  if (el instanceof Node) {
    return el;
  }
  const realNode = el.tagName ? createElement(el) : createText(el);
  return el.__realNode = realNode;
}
