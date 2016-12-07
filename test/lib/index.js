import { fragment, merge, mount } from '../../src';

export function run (src, tar) {
  const tree = mount(src);
  merge(fragment(src), fragment(tar));
  return tree;
}
