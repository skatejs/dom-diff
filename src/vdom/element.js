import { mapAccessor } from '../util/accessor';
import createTextNode from './text';

function separateData (obj) {
  const attrs = {};
  const events = {};
  const node = {};
  let attrIdx = 0;

  for (let name in obj) {
    const value = obj[name];

    if (name.indexOf('on') === 0) {
      events[name.substring(2)] = value;
    } else {
      attrs[attrIdx++] = attrs[name] = { name, value };
      mapAccessor(node, name, value);
    }
  }

  attrs.length = attrIdx;
  return { attrs, events, node };
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

function isChildren (arg) {
  return arg && (typeof arg === 'string' || Array.isArray(arg) || typeof arg.nodeType === 'number');
}

export default function (name, attrs = {}, ...chren) {
  const isAttrsNode = isChildren(attrs);
  const data = separateData(isAttrsNode ? {} : attrs);
  const node = data.node;
  node.nodeType = 1;
  node.tagName = ensureTagName(name);
  node.attributes = data.attrs;
  node.events = data.events;
  node.childNodes = ensureNodes(isAttrsNode ? [attrs].concat(chren) : chren);
  return node;
}
