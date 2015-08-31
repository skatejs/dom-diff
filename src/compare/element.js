import compareAttributes from './attributes';

export default function (src, dst) {
  if (src.tagName === dst.tagName) {
    return compareAttributes(src, dst);
  }
}
