import createTextNode from './text';

function ensureNodes (arr) {
  let out = [];
  if (!Array.isArray(arr)) {
    arr = [arr];
  }
  arr.filter(Boolean).forEach(function (item) {
    if (Array.isArray(item)) {
      out = out.concat(ensureNodes(item));
    } else if (typeof item === 'object') {
      out.push(translateFromReact(item));
    } else {
      out.push(createTextNode(item));
    }
  });
  return out;
}

function ensureTagName (name) {
  return (typeof name === 'function' ? name.id || name.name : name).toUpperCase();
}

function isNode (arg) {
  return arg && (typeof arg === 'string' || Array.isArray(arg) || typeof arg.nodeType === 'number' || isReactNode(arg));
}

function isReactNode (item) {
  return item && item.type && item.props;
}

function translateFromReact (item) {
  if (isReactNode(item)) {
    const props = item.props;
    const chren = ensureNodes(props.children);
    delete props.children;
    return {
      nodeType: 1,
      tagName: item.type,
      attributes: props,
      childNodes: chren
    };
  }
  return item;
}

let count = 0;
export default function (name, props, ...chren) {
  const isPropsNode = isNode(props);
  const node = {
    __id: ++count,
    childNodes: ensureNodes(isPropsNode ? [props].concat(chren) : chren),
    nodeType: 1,
    tagName: ensureTagName(name)
  };

  if (isPropsNode) {
    node.attributes = {};
    node.childNodes = [props].concat(chren);
    node.events = {};
    node.properties = {};
  } else {
    props = props || {};
    const { attributes, events } = props;
    node.attributes = attributes || {};
    node.childNodes = chren;
    node.events = events || {};
    node.properties = props;
    delete props.attributes;
    delete props.events;
  }

  return node;
}
