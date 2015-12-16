import realNodeMap from './real-node-map';

const { Node } = window;

export default function (node) {
  return node instanceof Node ? node : realNodeMap.get(node);
}
