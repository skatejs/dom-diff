import realNode from '../util/real-node';
export default function (src, dst, data) {
  const node = realNode(src);
  node.setAttribute(data.name, data.value);
  if (data.name === 'checked') {
    node.checked = true;
  } else if (data.name === 'selected') {
    node.selected = true;
  } else if (data.name === 'value') {
    node.value = data.value;
  }
}
