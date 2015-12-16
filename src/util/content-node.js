import realNode from './real-node';

const { Node } = window;

export default function (node) {
  const tmp = realNode(node);
  const contentNode = tmp.content;
  return contentNode instanceof Node ? contentNode : tmp;
}
