import realNode from '../util/real-node';
export default function (src, dst, data) {
  const node = realNode(src);
  node[data.name] = data.value;
}
