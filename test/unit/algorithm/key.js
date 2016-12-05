/* eslint-env jasmine, mocha */

import { h, merge, mount } from '../../../src';

describe.skip('key', () => {
  it('should maintain nodes in a list', () => {
    const source = h('ul', null,
      h('li', { key: 0 }, '0'),
      h('li', { key: 1 }, '1'),
      h('li', { key: 2 }, '2')
    );
    const destination = h('ul', null,
      h('li', { key: 0 }, '0'),
      h('li', { key: 2 }, '2')
    );

    const root = document.createElement('div');
    mount(root, source);

    const lastLiBefore = root.firstElementChild.children[2];

    merge({ source, destination });

    const lastLiAfter = root.firstElementChild.children[1];

    expect(lastLiBefore).to.equal(lastLiAfter);
  });

  it('should maintain nodes anywhere in the DOM', () => {

  });
});
