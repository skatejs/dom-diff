import createTextNode from './text';

function ensureAttributes (obj) {
  const map = {};
  let index = 0;
  for (let a in obj) {
    map[index++] = map[a] = {
      name: a,
      value: obj[a]
    };
  }
  map.length = index;
  return map;
}

function ensureNodes (arr) {
  let out = [];
  arr.filter(Boolean).forEach(function (item) {
    if (Array.isArray(item)) {
      out = out.concat(ensureNodes(item));
    } else if (typeof item === 'object') {
      out.push(item);
    } else {
      out.push(createTextNode(item));
    }
  });
  return out;
}

function ensureTagName (name) {
  return (typeof name === 'function' ? name.id || name.name : name).toUpperCase();
}

export default function (name, props = {}, ...chren) {
  return {
    tagName: ensureTagName(name),
    nodeType: 1,
    attributes: ensureAttributes(props),
    childNodes: ensureNodes(chren)
  };
}
