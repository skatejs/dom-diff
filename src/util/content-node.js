import realNode from './real-node';

export default function (node) {
  const tmp = realNode(node);
  const contentNode = tmp.content;
  return contentNode && contentNode.appendChild ? contentNode : tmp;
}
