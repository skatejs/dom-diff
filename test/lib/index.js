import { merge, mount } from '../../src';

export function run (source, destination) {
  const tree = mount(source);
  merge({ source, destination });
  return tree;
}
