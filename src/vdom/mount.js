import contentNode from '../util/content-node';
import dom from './dom';

export default function (elem, tree) {
  const content = elem;
  while (content.firstChild){
    content.firstChild.remove();
  }
  content.appendChild(dom(tree));
}
