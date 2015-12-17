import { setAccessor } from '../util/accessor';
import realNode from '../util/real-node';

export default function (src, dst, data) {
  setAccessor(realNode(src), data.name, data.value);
}
