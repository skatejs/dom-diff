import dom from '../to-dom';
import nodeMap from '../util/node-map';

export default function (src, dst) {
  const realSrc = nodeMap[src.__id];
  if (realSrc) {
    realSrc.parentNode && realSrc.parentNode.replaceChild(dom(dst), realSrc);
  } else {
    src.__id = dst.__id;
    src.nodeType = dst.nodeType;
    src.tagName = dst.tagName;
    src.attributes = dst.attributes;
    src.events = dst.events;
    src.childNodes = dst.childNodes;
  }
}
