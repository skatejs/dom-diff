import realNode from '../util/real-node';

export default function (src, dst) {
  (realNode(src) || src).textContent = dst.textContent;
}
