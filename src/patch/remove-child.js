import realNode from '../util/real-node';

export default function (src, dst) {
  const realDst = realNode(dst);
  realDst.parentNode.removeChild(realDst);
}
