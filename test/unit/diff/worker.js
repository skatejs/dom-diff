/* eslint-env jasmine, mocha */

import { diff, h, merge, patch, render, toDom } from '../../../src/index';

describe('diff/worker', function () {
  it('diff', done => {
    const src = h('div', null, 'text 1');
    const tar = h('div', null, 'text 2');
    const realDom = toDom(src);

    diff(src, tar, {
      done (instructions) {
        expect(Array.isArray(instructions)).to.be.true;
        patch(instructions);
        expect(realDom.textContent).to.equal('text 2');
        done();
      }
    });
  });

  it('merge', done => {
    const src = h('div', null, 'test 1');
    const tar = h('div', null, 'test 2');
    const realDom = toDom(src);

    merge(src, tar, {
      done () {
        expect(realDom.textContent).to.equal('test 2');
        done();
      }
    });
  });

  it('render', done => {
    const root = document.createElement('div');
    const rend = render(function (root) {
      return h('div', null, root.test);
    });

    root.test = 'test 1';
    rend(root, () => {
      expect(root.textContent).to.equal('test 1', 'not updated to test 1');
      root.test = 'test 2';
      rend(root, () => {
        expect(root.textContent).to.equal('test 2', 'not updated to test 2');
        done();
      });
    });
  });
});
