import dom from '../vdom/dom';
import realNode from '../util/real-node';

export default function (src, dst) {
  const realNodeSrc = realNode(src);
  realNodeSrc.parentNode.replaceChild(dom(dst), realNodeSrc);
}
