import compareAttributes from './attributes';
import compareEvents from './events';

export default function (src, dst) {
  if (src.tagName === dst.tagName) {
    return compareAttributes(src, dst)
      .concat(compareEvents(src, dst));
  }
}
