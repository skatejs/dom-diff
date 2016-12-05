import compareEvents from './events';
import compareProperties from './properties';

export default function (src, dst) {
  if (src.tagName === dst.tagName) {
    return compareEvents(src, dst)
      .concat(compareProperties(src, dst));
  }
}
