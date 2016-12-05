import nodeMap from '../util/node-map';

export default function (src, dst) {
  const realDst = nodeMap[dst.__id];
  const realSrc = nodeMap[dst.__id];

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
