/* eslint-env jasmine, mocha */

import { diff, h, merge, patch, toDom, types } from '../../src';

const { assert } = window;

describe('patch', () => {
  it('host should not change', function () {
    const src = h('div', null, h('span'));
    const dst = h('div', null, h('a'));
    const instructions = diff({ destination: dst, source: src });

    patch(instructions);
    assert.equal(src.tagName, 'DIV');
  });

  it('same elements should not change', function () {
    const src = h('div', null, h('span'));
    const dst = h('div', null, h('span'), h('a'));
    const instructions = diff({ destination: dst, source: src });
    const srcSpan = src.childNodes[0];

    patch(instructions);
    assert.equal(src.childNodes[0], srcSpan);
  });

  it('only compares items at the same index', function () {
    const src = h('div', null, h('span'));
    const dst = h('div', null, h('a'), h('span'));
    const instructions = diff({ destination: dst, source: src });
    const srcSpan = src.childNodes[0];

    patch(instructions);
    assert.notEqual(src.childNodes[0], srcSpan);
    assert.notEqual(src.childNodes[1], srcSpan);
  });

  it('should not patch equal text nodes', function () {
    const src = h('div', null, 'text');
    const dst = h('div', null, 'text');
    const text = src.childNodes[0];

    merge({ source: src, destination: dst });
    assert.equal(text, src.childNodes[0]);
  });

  it('should patch on subsequent runs', function () {
    const src = h('div', null, 'test 1');
    const dst1 = h('div', null, 'test 2');
    const dst2 = h('div', null, 'test 3');

    merge({ source: src, destination: dst1 });
    assert.equal(src.textContent, 'test 2');

    merge({ source: src, destination: dst2 });
    assert.equal(src.textContent, 'test 3');
  });

  describe('attributes', function () {
    it('should add attributes', function () {
      const src = h('div', null, h('div'));
      const dst = h('div', null, h('div', { name: 'value' }));

      merge({ source: src, destination: dst });

      const realSrc = toDom(src);
      expect(realSrc.children[0].getAttribute('name')).to.equal('value');
    });

    it('should updated attributes', function () {
      const src = h('div', null, h('div', { name: 'old' }));
      const dst = h('div', null, h('div', { name: 'new' }));

      merge({ source: src, destination: dst });

      const realSrc = toDom(src);
      expect(realSrc.children[0].getAttribute('name')).to.equal('new');
    });

    it('should remove attributes', function () {
      const src = h('div', null, h('div', { name: 'value' }));
      const dst = h('div', null, h('div'));

      merge({ source: src, destination: dst });

      const realSrc = toDom(src);
      expect(realSrc.children[0].hasAttribute('name')).to.equal(false);
    });
  });

  describe('properties', function () {
    describe('props "in" an element', function () {
      it('sets a property', function () {
        const src = h('div', null, h('input'));
        const dst = h('div', null, h('input', { name: 'value' }));
        const instructions = merge({ source: src, destination: dst });

        expect(instructions.length).to.equal(1);
        expect(instructions[0].type).to.equal(types.SET_ATTRIBUTE);

        const realSrc = toDom(src);
        expect(realSrc.children[0].getAttribute('name')).to.equal('value');
        expect(realSrc.children[0].name).to.equal('value');
      });

      it('updates a property', function () {
        const src = h('div', null, h('input', { name: 'old' }));
        const dst = h('div', null, h('input', { name: 'new' }));
        const instructions = merge({ source: src, destination: dst });

        expect(instructions.length).to.equal(1);
        expect(instructions[0].type).to.equal(types.SET_ATTRIBUTE);

        const realSrc = toDom(src);
        expect(realSrc.children[0].getAttribute('name')).to.equal('new');
        expect(realSrc.children[0].name).to.equal('new');
      });

      it('does not update an attribute if the values are the same', function () {
        const src = h('div', null, h('input', { name: 'value' }));
        const dst = h('div', null, h('input', { name: 'value' }));
        const instructions = merge({ source: src, destination: dst });

        expect(instructions.length).to.equal(0);
      });

      it('removes a property', function () {
        const src = h('div', null, h('input', { name: 'old' }));
        const dst = h('div', null, h('input'));
        const instructions = merge({ source: src, destination: dst });

        expect(instructions.length).to.equal(1);
        expect(instructions[0].type).to.equal(types.REMOVE_ATTRIBUTE);

        const realSrc = toDom(src);
        expect(realSrc.children[0].getAttribute('name')).to.equal('');
        expect(realSrc.children[0].name).to.equal('');
      });
    });

    describe('props *not* "in" an element', function () {
      it('sets an attribute', function () {
        const src = h('div', null, h('div'));
        const dst = h('div', null, h('div', { name: 'value' }));
        const instructions = merge({ source: src, destination: dst });

        expect(instructions.length).to.equal(1);
        expect(instructions[0].type).to.equal(types.SET_ATTRIBUTE);

        const realSrc = toDom(src);
        expect(realSrc.children[0].getAttribute('name')).to.equal('value');
        expect(realSrc.children[0].name).to.equal(undefined);
      });

      it('updates an attribute', function () {
        const src = h('div', null, h('div', { name: 'old' }));
        const dst = h('div', null, h('div', { name: 'new' }));
        const instructions = merge({ source: src, destination: dst });

        expect(instructions.length).to.equal(1);
        expect(instructions[0].type).to.equal(types.SET_ATTRIBUTE);

        const realSrc = toDom(src);
        expect(realSrc.children[0].getAttribute('name')).to.equal('new');
        expect(realSrc.children[0].name).to.equal(undefined);
      });

      it('does not update a property if the values are the same', function () {
        const src = h('div', null, h('div', { name: 'value' }));
        const dst = h('div', null, h('div', { name: 'value' }));
        const instructions = merge({ source: src, destination: dst });

        expect(instructions.length).to.equal(0);
      });

      it('removes an attribute', function () {
        const src = h('div', null, h('div', { name: 'old' }));
        const dst = h('div', null, h('div'));
        const instructions = merge({ source: src, destination: dst });

        expect(instructions.length).to.equal(1);
        expect(instructions[0].type).to.equal(types.REMOVE_ATTRIBUTE);

        const realSrc = toDom(src);
        expect(realSrc.children[0].hasAttribute('name')).to.equal(false);
        expect(realSrc.children[0].name).to.equal(undefined);
      });
    });

    describe('class -> className', function () {
      it('sets', function () {
        const src = h('div', null, h('div'));
        const dst = h('div', null, h('div', { class: 'value' }));

        merge({ source: src, destination: dst });

        const realSrc = toDom(src);
        expect(realSrc.children[0].getAttribute('class')).to.equal('value');
        expect(realSrc.children[0].className).to.equal('value');
      });
    });

    describe('style -> style.cssText', function () {
      it.only('sets', function () {
        const src = h('div', null, h('div'));
        const dst = h('div', null, h('div', { style: { display: 'block' } }));

        merge({ source: src, destination: dst });

        const realSrc = toDom(src);
        expect(realSrc.children[0].getAttribute('style')).to.equal('display: block;');
        expect(realSrc.children[0].style.cssText).to.equal('display: block;');
      });
    });

    describe('type -> type', function () {
      it('sets', function () {
        const src = h('div', null, h('input'));
        const dst = h('div', null, h('input', { attributes: { type: 'text' } }));

        merge({ source: src, destination: dst });

        const realSrc = toDom(src);
        expect(realSrc.children[0].getAttribute('type')).to.equal('text');
        expect(realSrc.children[0].type).to.equal('text');
      });
    });
  });
});
