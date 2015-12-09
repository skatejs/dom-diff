import realNode from '../util/real-node';

export default function (src, dst, data) {
  const node = realNode(src);
  node.removeAttribute(data.name);
  if (data.name === 'checked') {
    node.checked = false;
  } else if (data.name === 'selected') {
    node.selected = false;
  } else if (data.name === 'value') {
    node.value = '';
  }
}
