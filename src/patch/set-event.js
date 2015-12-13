import realNode from '../util/real-node';
export default function (src, dst, data) {
  const node = realNode(src);
  const name = data.name;
  const func = data.value;

  // This is a hack as described in the vDOM -> DOM creation function but we
  // need to be able to unbind the previous event handler otherwise events may
  // stack causing major issues.
  const temp = `__events_${name}`;
  node.removeEventListener(name, node[temp]);
  node.addEventListener(name, node[temp] = func);
}
