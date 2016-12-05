/* eslint-env jasmine, mocha */

import { h } from '../../src';

describe('h', function () {
  it('should render a built-in element', function () {
    const el = h('div');
    expect(el.tagName).to.equal('DIV');
  });

  it('should render a custom element', function () {
    const el = h('x-div');
    expect(el.tagName).to.equal('X-DIV');
  });

  it('should set attributes', function () {
    const el = h('div', { attr1: undefined, attr2: null, attr3: false, attr4: 0, attr5: '' });
    expect(el.attributes.attr1.name).to.equal('attr1');
    expect(el.attributes.attr2.name).to.equal('attr2');
    expect(el.attributes.attr3.name).to.equal('attr3');
    expect(el.attributes.attr4.name).to.equal('attr4');
    expect(el.attributes.attr5.name).to.equal('attr5');
    expect(el.attributes.attr1.value).to.equal(undefined);
    expect(el.attributes.attr2.value).to.equal(null);
    expect(el.attributes.attr3.value).to.equal(false);
    expect(el.attributes.attr4.value).to.equal(0);
    expect(el.attributes.attr5.value).to.equal('');
  });

  it('should bind events', function () {
    const el = h('div', { onclick: function () {} });
    expect(el.events.click).to.be.a('function');
  });

  it('should take children as the second and third arguments', function () {
    const el1 = h('div', 'text-1-1', 'text-1-2');
    const el2 = h('div', h('span-2-1'), h('span-2-2'));
    const el3 = h('div', ['text-3-1', h('span-3-1')], ['text-3-2', h('span-3-2')]);
    const el4 = h('div', [['text-4-1'], [h('span-4-1')]], [['text-4-2'], [h('span-4-2')]]);

    expect(el1.childNodes[0].textContent).to.equal('text-1-1');
    expect(el1.childNodes[1].textContent).to.equal('text-1-2');

    expect(el2.childNodes[0].tagName).to.equal('SPAN-2-1');
    expect(el2.childNodes[1].tagName).to.equal('SPAN-2-2');

    expect(el3.childNodes[0].textContent).to.equal('text-3-1');
    expect(el3.childNodes[1].tagName).to.equal('SPAN-3-1');
    expect(el3.childNodes[2].textContent).to.equal('text-3-2');
    expect(el3.childNodes[3].tagName).to.equal('SPAN-3-2');

    expect(el4.childNodes[0].textContent).to.equal('text-4-1');
    expect(el4.childNodes[1].tagName).to.equal('SPAN-4-1');
    expect(el4.childNodes[2].textContent).to.equal('text-4-2');
    expect(el4.childNodes[3].tagName).to.equal('SPAN-4-2');
  });

  it('should take class as an array of strings', function () {
    const el = h('div', {
      class: ['class1', 'class2']
    });
    expect(el.className).to.equal('class1 class2');
  });

  it('should take class as an object of key (string) value (boolean) pairs', function () {
    const el = h('div', {
      class: {
        class1: false,
        class2: true
      }
    });
    expect(el.className).to.equal('class2');
  });

  it('should take style as an object', function () {
    const el = h('div', {
      style: {
        background: 'something',
        display: 'none'
      }
    });
    expect(el.style.cssText).to.equal('background: something; display: none;');
  });
});
