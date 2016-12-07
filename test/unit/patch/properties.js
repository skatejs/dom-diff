/* eslint-env jasmine, mocha */

import { diff, h } from '../../../src';
import { run } from '../../lib';

describe('patch/properties', () => {
  describe('props "in" an element', function () {
    it('creates a property', function () {
      const src = h('div');
      const tar = h('div', { className: 'new' });
      const dom = run(src, tar);

      expect(dom.children[0].className).to.equal('new');
      expect(dom.children[0].getAttribute('class')).to.equal('new');
    });

    it('updates a property', function () {
      const src = h('div', { className: 'old' });
      const tar = h('div', { className: 'new' });
      const dom = run(src, tar);

      expect(dom.children[0].className).to.equal('new');
      expect(dom.children[0].getAttribute('class')).to.equal('new');
    });

    it('removes a property', function () {
      const src = h('div', { className: 'old' });
      const tar = h('div');
      const dom = run(src, tar);

      expect(!!dom.children[0].className).to.equal(false);
      expect(dom.children[0].hasAttribute('class')).to.equal(false);
    });

    it('does not generate instructions if values are the same', function () {
      const src = h('div', { className: 'new' });
      const tar = h('div', { className: 'new' });
      const ins = diff(src, tar);

      expect(ins.length).to.equal(0);
    });
  });

  describe('props *not* "in" an element', function () {
    it('creates a property', function () {
      const src = h('div');
      const tar = h('div', { name: 'new' });
      const dom = run(src, tar);

      expect(dom.children[0].name).to.equal('new');
      expect(dom.children[0].getAttribute('name')).to.equal(null);
    });

    it('updates a property', function () {
      const src = h('div', { name: 'old' });
      const tar = h('div', { name: 'new' });
      const dom = run(src, tar);

      expect(dom.children[0].name).to.equal('new');
      expect(dom.children[0].getAttribute('name')).to.equal(null);
    });

    it('removes a property', function () {
      const src = h('div', { name: 'old' });
      const tar = h('div');
      const dom = run(src, tar);

      expect(dom.children[0].name).to.equal(undefined);
      expect(dom.children[0].getAttribute('name')).to.equal(null);
    });

    it('does not generate instructions if values are the same', function () {
      const src = h('div', { name: 'new' });
      const tar = h('div', { name: 'new' });
      const ins = diff(src, tar);

      expect(ins.length).to.equal(0);
    });
  });

  describe('style', function () {
    it('object', function () {
      const src = h('div');
      const tar = h('div', { style: { display: 'block' } });
      const dom = run(src, tar);

      expect(dom.firstChild.getAttribute('style')).to.equal('display: block;');
    });

    it('string', function () {
      const src = h('div');
      const tar = h('div', { style: 'display: block' });
      const dom = run(src, tar);

      expect(dom.firstChild.getAttribute('style')).to.equal('display: block;');
    });
  });
});
