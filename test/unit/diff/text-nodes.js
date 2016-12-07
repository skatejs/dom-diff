/* eslint-env jasmine, mocha */

import { diff, h } from '../../../src';

describe('patch', () => {
  it('should not patch equal text nodes', function () {
    const src = h('div', null, 'text');
    const tar = h('div', null, 'text');
    const ins = diff(src, tar);

    expect(ins.length).to.equal(0);
  });
});
