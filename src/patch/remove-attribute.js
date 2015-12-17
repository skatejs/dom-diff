import { removeAccessor } from '../util/accessor';
import realNode from '../util/real-node';

export default function (src, dst, data) {
  removeAccessor(realNode(src), data.name);
}
