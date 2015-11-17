export default function (node) {
  return node instanceof Node ? node : node.__realNode;
}
