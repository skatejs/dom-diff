/* eslint-env jasmine, mocha */

import { diff, h, types } from '../../../src';

describe('diff/element-nodes', () => {
  it('same elements should not change', function () {
    const src = h('div');
    const tar = h('div');
    const ins = diff(src, tar);

    expect(ins.length).to.equal(0);
  });

  it('only compares items at the same index', function () {
    const src = h('div', null, h('span'));
    const tar = h('div', null, h('a'), h('span'));
    const ins = diff(src, tar);

    expect(ins.length).to.equal(2);
    expect(ins[0].type).to.equal(types.REPLACE_CHILD);
    expect(ins[1].type).to.equal(types.APPEND_CHILD);
  });
});
