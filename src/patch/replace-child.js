export default function (src, dst) {
  src.parentNode.replaceChild(dst, src);
}
