import contentNode from '../util/content-node';
import dom from '../vdom/dom';

export default function (src, dst) {
  contentNode(src).appendChild(dom(dst));
}
