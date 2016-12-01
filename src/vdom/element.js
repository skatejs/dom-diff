import { mapAccessor } from '../util/accessor';
import createTextNode from './text';

function separateData (obj) {
  const attrs = {};
  const events = {};
  const node = {};
  let attrIdx = 0;

  for (let name in obj) {
    let value = obj[name];

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

function isChildren (arg) {
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
export default function element (name, attrs = {}, ...chren) {
  const isAttrsNode = isChildren(attrs);
  const data = separateData(isAttrsNode ? {} : attrs);
  const node = data.node;
  node.__id = ++count;
  node.nodeType = 1;
  node.tagName = ensureTagName(name);
  node.attributes = data.attrs;
  node.events = data.events;
  node.childNodes = ensureNodes(isAttrsNode ? [attrs].concat(chren) : chren);
  return node;
}

// Add an array factory that returns an array of virtual nodes.
element.array = ensureNodes;

// Generate built-in factories.
[
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'bgsound',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'command',
  'content',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'element',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'font',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'image',
  'img',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'marquee',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'multicol',
  'nav',
  'nobr',
  'noembed',
  'noframes',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'rtc',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'shadow',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr'
].forEach(function (tag) {
  element[tag] = element.bind(null, tag);
});
