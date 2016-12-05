/* eslint-env jasmine, mocha */

import { diff, h, merge, patch, render, toDom } from '../../../src/index';

const { assert } = window;

describe('worker', function () {
  it('diff', done => {
    const source = h('div', null, 'text 1');
    const destination = h('div', null, 'text 2');
    const realDom = toDom(source);

    diff({
      destination,
      source,
      done (instructions) {
        assert.ok(Array.isArray(instructions));
        patch(instructions);
        assert.ok(realDom.textContent === 'text 2');
        done();
      }
    });
  });

  it('merge', done => {
    const source = h('div', null, 'test 1');
    const destination = h('div', null, 'test 2');
    const realDom = toDom(source);

    merge({
      destination,
      source,
      done () {
        assert.ok(realDom.textContent === 'test 2');
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
      assert.ok(root.textContent === 'test 1', 'not updated to test 1');
      root.test = 'test 2';
      rend(root, () => {
        assert.ok(root.textContent === 'test 2', 'not updated to test 2');
        done();
      });
    });
  });
});
