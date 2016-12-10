/* eslint-env jasmine, mocha */

import { h, merge, mount } from '../../../src';

describe.skip('patch/key', () => {
  it('should maintain nodes in a list', () => {
    const src = h('ul', null,
      h('li', { key: 0 }, '0'),
      h('li', { key: 1 }, '1'),
      h('li', { key: 2 }, '2')
    );
    const tar = h('ul', null,
      h('li', { key: 0 }, '0'),
      h('li', { key: 2 }, '2')
    );

    const root = document.createElement('div');
    mount(root, src);

    const lastLiBefore = root.firstElementChild.children[2];

    merge(src, tar);

    const lastLiAfter = root.firstElementChild.children[1];

    expect(lastLiBefore).to.equal(lastLiAfter);
  });

  it('should maintain nodes anywhere in the DOM', () => {

  });
});
