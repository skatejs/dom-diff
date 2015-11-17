import dom from '../vdom/dom';
import realNode from '../util/real-node';

export default function (src, dst) {
  realNode(src).textContent = dom(dst).textContent;
}
