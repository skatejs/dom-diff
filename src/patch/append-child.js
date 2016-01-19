import realNode from '../util/real-node';
import dom from '../vdom/dom';

export default function (src, dst) {
  realNode(src).appendChild(dom(dst));
}
