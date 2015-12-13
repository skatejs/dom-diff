import compareAttributes from './attributes';
import compareProperties from './properties';

export default function (src, dst) {
  if (src.tagName === dst.tagName) {
    return compareAttributes(src, dst).concat(compareProperties(src, dst));
  }
}
