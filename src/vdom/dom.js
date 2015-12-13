function createElement (el) {
  const realNode = document.createElement(el.tagName);

  if (el.attributes) {
    for (let a = 0; a < el.attributes.length; a++) {
      const attr = el.attributes[a];
      const name = attr.name;
      const value = attr.value;
      if (value) {
        realNode.setAttribute(name, value);
      }
    }
  }

  if (el.properties) {
    for (name in el.properties) {
      const value = el.properties[name];
      if (name === 'content') {
        if (Array.isArray(value)) {
          value.forEach(ch => realNode.appendChild(render(ch)));
        } else {
          realNode.appendChild(render(value));
        }
      } else if (name.indexOf('on') === 0) {
        realNode.addEventListener(name.substring(2).toLowerCase(), value);
      } else if (value) {
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
