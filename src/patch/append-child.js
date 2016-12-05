import nodeMap from '../util/node-map';
import toDom from '../to-dom';

export default function (src, dst) {
  nodeMap[src.__id].appendChild(toDom(dst));
}
