import realNode from '../util/real-node';

export default function (src, dst, data) {
  const { name } = data;
  realNode(src)[name] = dst[name];
}
