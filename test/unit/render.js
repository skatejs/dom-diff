/* eslint-env jasmine, mocha */
/** @jsx h */

import { h, render } from '../../src';

describe('render', function () {
  it('should initially render and re-render', function () {
    const root = document.createElement('div');
    const draw = render(({ test }) => <div><span>{test}</span></div>);

    ['test 1', 'test 1', 'test 2', 'test 2'].forEach(function (test) {
      root.test = test;
      draw(root);
      expect(root.innerHTML).to.equal(`<div><span>${test}</span></div>`);
    });
  });
});
