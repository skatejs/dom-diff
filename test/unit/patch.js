/* eslint-env jasmine, mocha */

import { diff, h, types } from '../../src';
import { run } from '../lib';

describe('patch', () => {
  it('same elements should not change', function () {
    const src = h('div');
    const dst = h('div');
    const ins = diff({ destination: dst, source: src });

    expect(ins.length).to.equal(0);
  });

  it('only compares items at the same index', function () {
    const src = h('div', null, h('span'));
    const dst = h('div', null, h('a'), h('span'));
    const ins = diff({ destination: dst, source: src });

    expect(ins.length).to.equal(2);
    expect(ins[0].type).to.equal(types.REPLACE_CHILD);
    expect(ins[1].type).to.equal(types.APPEND_CHILD);
  });

  it('should not patch equal text nodes', function () {
    const src = h('div', null, 'text');
    const dst = h('div', null, 'text');
    const ins = diff({ destination: dst, source: src });

    expect(ins.length).to.equal(0);
  });

  describe('properties', function () {
    describe('props "in" an element', function () {
      it('creates a property', function () {
        const src = h('div');
        const dst = h('div', { className: 'new' });
        const dom = run(src, dst);

        expect(dom.children[0].className).to.equal('new');
        expect(dom.children[0].getAttribute('class')).to.equal('new');
      });

      it('updates a property', function () {
        const src = h('div', { className: 'old' });
        const dst = h('div', { className: 'new' });
        const dom = run(src, dst);

        expect(dom.children[0].className).to.equal('new');
        expect(dom.children[0].getAttribute('class')).to.equal('new');
      });

      it('removes a property', function () {
        const src = h('div', { className: 'old' });
        const dst = h('div');
        const dom = run(src, dst);

        expect(dom.children[0].className).to.equal('');
        expect(dom.children[0].getAttribute('class')).to.equal(null);
      });

      it('does not generate instructions if values are the same', function () {
        const src = h('div', { className: 'new' });
        const dst = h('div', { className: 'new' });
        const ins = diff({ source: src, destination: dst });

        expect(ins.length).to.equal(0);
      });
    });

    describe('props *not* "in" an element', function () {
      it('creates a property', function () {
        const src = h('div');
        const dst = h('div', { name: 'new' });
        const dom = run(src, dst);

        expect(dom.children[0].name).to.equal('new');
        expect(dom.children[0].getAttribute('name')).to.equal(null);
      });

      it('updates a property', function () {
        const src = h('div', { name: 'old' });
        const dst = h('div', { name: 'new' });
        const dom = run(src, dst);

        expect(dom.children[0].name).to.equal('new');
        expect(dom.children[0].getAttribute('name')).to.equal(null);
      });

      it('removes a property', function () {
        const src = h('div', { name: 'old' });
        const dst = h('div');
        const dom = run(src, dst);

        expect(dom.children[0].name).to.equal(undefined);
        expect(dom.children[0].getAttribute('name')).to.equal(null);
      });

      it('does not generate instructions if values are the same', function () {
        const src = h('div', { name: 'new' });
        const dst = h('div', { name: 'new' });
        const ins = diff({ source: src, destination: dst });

        expect(ins.length).to.equal(0);
      });
    });

    describe('style', function () {
      it('object', function () {
        const src = h('div');
        const dst = h('div', { style: { display: 'block' } });
        const dom = run(src, dst);

        expect(dom.firstChild.getAttribute('style')).to.equal('display: block;');
      });

      it('string', function () {
        const src = h('div');
        const dst = h('div', { style: 'display: block' });
        const dom = run(src, dst);

        expect(dom.firstChild.getAttribute('style')).to.equal('display: block;');
      });
    });
  });
});
