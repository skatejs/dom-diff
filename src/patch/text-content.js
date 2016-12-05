import nodeMap from '../util/node-map';

export default function (src, dst) {
  nodeMap[src.__id].textContent = dst.textContent;
}
