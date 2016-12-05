import realNode from '../util/real-node';

export default function (src, dst, data) {
  const { name, value } = data;
  const real = realNode(src);
  if (real) {
    real.setAttribute(name, value);
  } else {
    src.attributes[name] = value;
  }
}
