/* eslint-env jasmine, mocha */

import { h, render } from '../../src';

describe('render', function () {
  it('should initially render and re-render', function () {
    const root = document.createElement('div');
    const rend = render(function (root) {
      return h('div', null, h('span', null, root.test));
    });

    ['test 1', 'test 1', 'test 2', 'test 2'].forEach(function (test) {
      root.test = test;
      rend(root);
      expect(root.innerHTML).to.equal(`<div><span>${test}</span></div>`);
    });
  });
});
