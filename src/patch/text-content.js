import realNode from '../util/real-node';

export default function (src, dst) {
  realNode(src).textContent = dst.textContent;
}
