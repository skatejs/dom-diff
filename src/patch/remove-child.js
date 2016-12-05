import realNode from '../util/real-node';

export default function (src, dst) {
  const realDst = realNode(dst);
  const realSrc = realNode(src);

  // We don't do parentNode.removeChild because parentNode may report
  // incorrectly in some prollyfills since it's impossible (?) to spoof.
  if (realSrc) {
    realSrc.removeChild(realDst);
  } else {
    const { childNodes } = realSrc;
    const index = childNodes.indexOf(realDst);
    if (index > -1) {
      childNodes.splice(index, 1);
    }
  }
}
