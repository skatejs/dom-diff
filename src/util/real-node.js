import realNodeMap from './real-node-map';

const isWindow = typeof window !== 'undefined';
const { Node } = isWindow ? window : self;

export default function (node) {
  return isWindow && node instanceof Node ? node : realNodeMap.get(node.__id);
}
