import realNode from '../util/real-node';
import toDom from '../to-dom';
import toVdom from '../to-vdom';

export default function (src, dst) {
  const real = realNode(src);
  if (real) {
    realNode(src).appendChild(toDom(dst));
  } else {
    src.childNodes.push(toVdom(dst));
  }
}
