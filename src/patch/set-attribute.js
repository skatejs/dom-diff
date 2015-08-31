export default function (src, dst, data) {
  src.setAttribute(data.name, dst.getAttribute(data.name));
}
