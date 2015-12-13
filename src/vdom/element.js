import createTextNode from './text';

function separateData (obj) {
  const attrs = {};
  const events = {};
  const props = {};
  let attrIdx = 0;

  for (let name in obj) {
    const value = obj[name];

    if (typeof value === 'string') {
      attrs[attrIdx++] = attrs[name] = { name, value };
    } else if (name.indexOf('on') === 0) {
      events[name.substring(2)] = value;
    } else {
      props[name] = value;
    }
  }

  attrs.length = attrIdx;
  return { attrs, events, props };
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

export default function (name, attrs = {}, ...chren) {
  const data = separateData(attrs);
  return {
    nodeType: 1,
    tagName: ensureTagName(name),
    attributes: data.attrs,
    events: data.events,
    properties: data.props,
    childNodes: ensureNodes(chren)
  };
}
