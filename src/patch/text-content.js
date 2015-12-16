import contentNode from '../util/content-node';

export default function (src, dst) {
  contentNode(src).textContent = dst.textContent;
}
