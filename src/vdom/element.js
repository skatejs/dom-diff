import createTextNode from './text';

function separateAttrsAndProps (obj) {
  const attrs = {};
  const props = {};
  let attrIdx = 0;

  for (let name in obj) {
    const value = obj[name];

    if (typeof value === 'string') {
      attrs[attrIdx++] = attrs[name] = { name, value };
    } else {
      props[name] = value;
    }
  }

  attrs.length = attrIdx;
  return { attrs, props };
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
  const attrsAndProps = separateAttrsAndProps(attrs);
  return {
    nodeType: 1,
    tagName: ensureTagName(name),
    attributes: attrsAndProps.attrs,
    properties: attrsAndProps.props,
    childNodes: ensureNodes(chren)
  };
}
