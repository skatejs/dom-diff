/* eslint-env jasmine, mocha */

import { diff, h, types } from '../../src';

const { assert } = window;

describe('diff', () => {
  it('instructions array', function () {
    const src = h('div');
    const dst = h('div');
    const instructions = diff({ destination: dst, source: src });

    assert.ok(Array.isArray(instructions));
  });

  it('instruction object', function () {
    const src = h('div', null, h('span'));
    const dst = h('div', null, h('a'));
    const instructions = diff({ destination: dst, source: src });

    assert.equal(instructions.length, 1, 'instruction length');
    assert.equal(instructions[0].destination.tagName, 'A', 'destination tagName');
    assert.equal(instructions[0].source.tagName, 'SPAN', 'source tagName');
    assert.equal(instructions[0].type, types.REPLACE_CHILD, 'type');
  });

  it('diffing root nodes (as opposed to only decendant trees)', () => {
    const root = true;
    const source = h('div');
    const destination = h('div', { test: 'test' });
    const instructions = diff({ destination, root, source });

    assert.equal(instructions.length, 1, 'should have instructions');
    assert.equal(instructions[0].data.name, 'test');
    assert.equal(instructions[0].data.value, 'test');
    assert.equal(instructions[0].destination, destination);
    assert.equal(instructions[0].source, source);
    assert.equal(instructions[0].type, types.SET_ATTRIBUTE);
  });
});
