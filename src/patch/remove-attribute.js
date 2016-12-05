import realNode from '../util/real-node';

export default function (src, dst, data) {
  const real = realNode(src);
  if (real) {
    real.removeAttribute(data.name);
  } else {
    delete src.attributes[data.name];
  }
}
