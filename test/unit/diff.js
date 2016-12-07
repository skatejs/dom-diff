/* eslint-env jasmine, mocha */

import { diff, h, types } from '../../src';

describe('diff', () => {
  it('instructions array', function () {
    const src = h('div');
    const tar = h('div');
    const instructions = diff(src, tar);

    expect(Array.isArray(instructions)).to.be.true;
  });

  it('instruction object', function () {
    const src = h('div', null, h('span'));
    const tar = h('div', null, h('a'));
    const instructions = diff(src, tar);

    expect(instructions.length).to.equal(1, 'instruction length');
    expect(instructions[0].target.localName).to.equal('a', 'target localName');
    expect(instructions[0].source.localName).to.equal('span', 'source localName');
    expect(instructions[0].type).to.equal(types.REPLACE_CHILD, 'type');
  });
});
