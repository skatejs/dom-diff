import dom from '../vdom/dom';
import realNode from '../util/real-node';

export default function (src, dst) {
  const realSrc = realNode(src);
  realSrc && realSrc.parentNode && realSrc.parentNode.replaceChild(dom(dst), realSrc);
}
