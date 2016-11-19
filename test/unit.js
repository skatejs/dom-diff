/* eslint-env jasmine, mocha */

import 'custom-event-polyfill';
import * as types from '../src/types';
import sd from '../src/index';
import vdom from '../src/vdom/element';

const { assert, CustomEvent } = window;

function createElement (...args) {
  return sd.vdom.dom(sd.vdom.element.apply(null, args));
}

describe('vdom/element', function () {
  it('should render a built-in element', function () {
    const el = vdom('div');
    expect(el.tagName).to.equal('DIV');
  });

  it('should render a custom element', function () {
    const el = vdom('x-div');
    expect(el.tagName).to.equal('X-DIV');
  });

  it('should set attributes', function () {
    const el = vdom('div', { attr1: undefined, attr2: null, attr3: false, attr4: 0, attr5: '' });
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
    const el = vdom('div', { onclick: function () {} });
    expect(el.events.click).to.be.a('function');
  });

  it('should take children as the second and third arguments', function () {
    const el1 = vdom('div', 'text-1-1', 'text-1-2');
    const el2 = vdom('div', vdom('span-2-1'), vdom('span-2-2'));
    const el3 = vdom('div', ['text-3-1', vdom('span-3-1')], ['text-3-2', vdom('span-3-2')]);
    const el4 = vdom('div', [['text-4-1'], [vdom('span-4-1')]], [['text-4-2'], [vdom('span-4-2')]]);

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
    const el = vdom('div', {
      class: ['class1', 'class2']
    });
    expect(el.className).to.equal('class1 class2');
  });

  it('should take class as an object of key (string) value (boolean) pairs', function () {
    const el = vdom('div', {
      class: {
        class1: false,
        class2: true
      }
    });
    expect(el.className).to.equal('class2');
  });

  it('should take style as an object', function () {
    const el = vdom('div', {
      style: {
        background: 'something',
        display: 'none'
      }
    });
    expect(el.style.cssText).to.equal('background: something; display: none;');
  });

  it('should export factories for standard HTML5 elements', function () {
    expect(vdom.a).to.be.a('function');
    expect(vdom.wbr).to.be.a('function');
    expect(vdom.div().tagName).to.equal('DIV');
  });
});

describe('jsx', function () {
  const React = { createElement: sd.vdom.element }; // eslint-disable-line no-unused-vars

  it('should render a built-in element', function () {
    const el = <div />;
    expect(el.tagName).to.equal('DIV');
  });

  it('should render a custom element', function () {
    const el = <x-div />;
    expect(el.tagName).to.equal('X-DIV');
  });

  it('should set attributes', function () {
    const el = <div attr1={undefined} attr2={null} attr3={false} attr4={0} attr5={''} />;
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
    const el = <div onclick={function () {}} />;
    expect(el.events.click).to.be.a('function');
  });
});

// Run the same tests for both real and virtual elements.
[createElement, sd.vdom.element].forEach(function (element, index) {
  function _describe (name, func) {
    const prefix = index === 0 ? 'REAL destination' : 'VIRTUAL destination';
    describe(`${prefix} - ${name}`, func);
  }

  _describe('diff', function () {
    it('instructions array', function () {
      const src = createElement('div');
      const dst = element('div');
      const instructions = sd.diff({ destination: dst, source: src });

      assert.ok(Array.isArray(instructions));
    });

    it('instruction object', function () {
      const src = createElement('div', null, element('span'));
      const dst = element('div', null, element('a'));
      const instructions = sd.diff({ destination: dst, source: src });

      assert.equal(instructions.length, 1, 'instruction length');
      assert.equal(instructions[0].destination.tagName, 'A', 'destination tagName');
      assert.equal(instructions[0].source.tagName, 'SPAN', 'source tagName');
      assert.equal(instructions[0].type, types.REPLACE_CHILD, 'type');
    });

    it('diffing root nodes (as opposed to only decendant trees)', () => {
      const root = true;
      const source = createElement('div');
      const destination = element('div', { test: 'test' });
      const instructions = sd.diff({ destination, root, source });

      assert.equal(instructions.length, 1, 'should have instructions');
      assert.equal(instructions[0].data.name, 'test');
      assert.equal(instructions[0].data.value, 'test');
      assert.equal(instructions[0].destination, destination);
      assert.equal(instructions[0].source, source);
      assert.equal(instructions[0].type, types.SET_ATTRIBUTE);
    });
  });

  _describe('patch', function () {
    it('host should not change', function () {
      const src = createElement('div', null, element('span'));
      const dst = element('div', null, element('a'));
      const instructions = sd.diff({ destination: dst, source: src });

      sd.patch(instructions);
      assert.equal(src.tagName, 'DIV');
    });

    it('same elements should not change', function () {
      const src = createElement('div', null, element('span'));
      const dst = element('div', null, element('span'), element('a'));
      const instructions = sd.diff({ destination: dst, source: src });
      const srcSpan = src.childNodes[0];

      sd.patch(instructions);
      assert.equal(src.childNodes[0], srcSpan);
    });

    it('only compares items at the same index', function () {
      const src = createElement('div', null, element('span'));
      const dst = element('div', null, element('a'), element('span'));
      const instructions = sd.diff({ destination: dst, source: src });
      const srcSpan = src.childNodes[0];

      sd.patch(instructions);
      assert.notEqual(src.childNodes[0], srcSpan);
      assert.notEqual(src.childNodes[1], srcSpan);
    });

    it('should not patch equal text nodes', function () {
      const src = createElement('div', null, 'text');
      const dst = element('div', null, 'text');
      const text = src.childNodes[0];

      sd.merge({ source: src, destination: dst });
      assert.equal(text, src.childNodes[0]);
    });

    it('should patch on subsequent runs', function () {
      const src = createElement('div', null, 'test 1');
      const dst1 = element('div', null, 'test 2');
      const dst2 = element('div', null, 'test 3');

      sd.merge({ source: src, destination: dst1 });
      assert.equal(src.textContent, 'test 2');

      sd.merge({ source: src, destination: dst2 });
      assert.equal(src.textContent, 'test 3');
    });

    describe('attributes', function () {
      it('should add attributes', function () {
        const src = createElement('div', null, createElement('div'));
        const dst = element('div', null, element('div', { name: 'value' }));

        sd.merge({ source: src, destination: dst });
        expect(src.children[0].getAttribute('name')).to.equal('value');
      });

      it('should updated attributes', function () {
        const src = createElement('div', null, createElement('div', { name: 'old' }));
        const dst = element('div', null, element('div', { name: 'new' }));

        sd.merge({ source: src, destination: dst });
        expect(src.children[0].getAttribute('name')).to.equal('new');
      });

      it('should remove attributes', function () {
        const src = createElement('div', null, createElement('div', { name: 'value' }));
        const dst = element('div', null, element('div'));

        sd.merge({ source: src, destination: dst });
        expect(src.children[0].hasAttribute('name')).to.equal(false);
      });
    });

    describe('properties', function () {
      describe('props "in" an element', function () {
        it('sets a property', function () {
          const src = createElement('div', null, createElement('input'));
          const dst = element('div', null, element('input', { name: 'value' }));
          const instructions = sd.merge({ source: src, destination: dst });

          expect(instructions.length).to.equal(1);
          expect(instructions[0].type).to.equal(types.SET_ATTRIBUTE);
          expect(src.children[0].getAttribute('name')).to.equal('value');
          expect(src.children[0].name).to.equal('value');
        });

        it('updates a property', function () {
          const src = createElement('div', null, createElement('input', { name: 'old' }));
          const dst = element('div', null, element('input', { name: 'new' }));
          const instructions = sd.merge({ source: src, destination: dst });

          expect(instructions.length).to.equal(1);
          expect(instructions[0].type).to.equal(types.SET_ATTRIBUTE);
          expect(src.children[0].getAttribute('name')).to.equal('new');
          expect(src.children[0].name).to.equal('new');
        });

        it('does not update an attribute if the values are the same', function () {
          const src = createElement('div', null, createElement('input', { name: 'value' }));
          const dst = element('div', null, element('input', { name: 'value' }));
          const instructions = sd.merge({ source: src, destination: dst });

          expect(instructions.length).to.equal(0);
        });

        it('removes a property', function () {
          const src = createElement('div', null, createElement('input', { name: 'old' }));
          const dst = element('div', null, element('input'));
          const instructions = sd.merge({ source: src, destination: dst });

          expect(instructions.length).to.equal(1);
          expect(instructions[0].type).to.equal(types.REMOVE_ATTRIBUTE);
          expect(src.children[0].getAttribute('name')).to.equal('');
          expect(src.children[0].name).to.equal('');
        });
      });

      describe('props *not* "in" an element', function () {
        it('sets an attribute', function () {
          const src = createElement('div', null, createElement('div'));
          const dst = element('div', null, element('div', { name: 'value' }));
          const instructions = sd.merge({ source: src, destination: dst });

          expect(instructions.length).to.equal(1);
          expect(instructions[0].type).to.equal(types.SET_ATTRIBUTE);
          expect(src.children[0].getAttribute('name')).to.equal('value');
          expect(src.children[0].name).to.equal(undefined);
        });

        it('updates an attribute', function () {
          const src = createElement('div', null, createElement('div', { name: 'old' }));
          const dst = element('div', null, element('div', { name: 'new' }));
          const instructions = sd.merge({ source: src, destination: dst });

          expect(instructions.length).to.equal(1);
          expect(instructions[0].type).to.equal(types.SET_ATTRIBUTE);
          expect(src.children[0].getAttribute('name')).to.equal('new');
          expect(src.children[0].name).to.equal(undefined);
        });

        it('does not update a property if the values are the same', function () {
          const src = createElement('div', null, createElement('div', { name: 'value' }));
          const dst = element('div', null, element('div', { name: 'value' }));
          const instructions = sd.merge({ source: src, destination: dst });

          expect(instructions.length).to.equal(0);
        });

        it('removes an attribute', function () {
          const src = createElement('div', null, createElement('div', { name: 'old' }));
          const dst = element('div', null, element('div'));
          const instructions = sd.merge({ source: src, destination: dst });

          expect(instructions.length).to.equal(1);
          expect(instructions[0].type).to.equal(types.REMOVE_ATTRIBUTE);
          expect(src.children[0].hasAttribute('name')).to.equal(false);
          expect(src.children[0].name).to.equal(undefined);
        });
      });

      describe('class -> className', function () {
        it('sets', function () {
          const src = createElement('div', null, createElement('div'));
          const dst = element('div', null, element('div', { class: 'value' }));

          sd.merge({ source: src, destination: dst });
          expect(src.children[0].getAttribute('class')).to.equal('value');
          expect(src.children[0].className).to.equal('value');
        });
      });

      describe('style -> style.cssText', function () {
        it('sets', function () {
          const src = createElement('div', null, createElement('div'));
          const dst = element('div', null, element('div', { style: 'display: block;' }));

          sd.merge({ source: src, destination: dst });
          expect(src.children[0].getAttribute('style')).to.equal('display: block;');
          expect(src.children[0].style.cssText).to.equal('display: block;');
        });
      });

      describe('type -> type', function () {
        it('sets', function () {
          const src = createElement('div', null, createElement('input'));
          const dst = element('div', null, element('input', { type: 'text' }));

          sd.merge({ source: src, destination: dst });
          expect(src.children[0].getAttribute('type')).to.equal('text');
          expect(src.children[0].type).to.equal('text');
        });
      });
    });
  });
});

describe('events', function () {
  const onclick = e => (e.target.triggered = true);

  it('should add listeners', function () {
    const src = createElement('div', null, createElement('button'));
    const dst = sd.vdom.element('div', null, sd.vdom.element('button', { onclick }));
    const instructions = sd.merge({ source: src, destination: dst });

    // The instruction should explicitly set an event.
    expect(instructions.length).to.equal(1);
    expect(instructions[0].type).to.equal(types.SET_EVENT);
    expect(instructions[0].data.name).to.equal('click');
    expect(instructions[0].data.value).to.equal(onclick);

    // It should be added via addEventListener().
    expect(src.children[0].hasAttribute('onclick')).to.equal(false);
    expect(src.children[0].onclick).to.equal(null);

    src.children[0].dispatchEvent(new CustomEvent('click'));
    expect(src.children[0].triggered).to.equal(true);
  });

  it('should replace different listeners', function () {
    const noop = function () {};
    const src = createElement('div', null, createElement('button'));
    const dst1 = sd.vdom.element('div', null, sd.vdom.element('button', { onclick }));
    const dst2 = sd.vdom.element('div', null, sd.vdom.element('button', { onclick: noop }));

    const instructions1 = sd.merge({ source: src, destination: dst1 });
    expect(instructions1.length).to.equal(1);
    expect(instructions1[0].type).to.equal(types.SET_EVENT);
    expect(instructions1[0].data.name).to.equal('click');
    expect(instructions1[0].data.value).to.equal(onclick);

    const instructions2 = sd.merge({ source: src, destination: dst2 });
    expect(instructions2.length).to.equal(2);
    expect(instructions2[0].type).to.equal(types.SET_EVENT);
    expect(instructions2[0].data.name).to.equal('click');
    expect(instructions2[0].data.value).to.equal(undefined);
    expect(instructions2[1].type).to.equal(types.SET_EVENT);
    expect(instructions2[1].data.name).to.equal('click');
    expect(instructions2[1].data.value).to.equal(noop);
  });

  it('should not replace or add same listeners', function () {
    const src = createElement('div', null, createElement('button'));
    const dst1 = sd.vdom.element('div', null, sd.vdom.element('button', { onclick }));
    const dst2 = sd.vdom.element('div', null, sd.vdom.element('button', { onclick }));

    const instructions1 = sd.merge({ source: src, destination: dst1 });
    expect(instructions1.length).to.equal(1);

    // Since we are passing the same handler here and are testing that there
    // no instructions, we are testing both:
    //
    // 1. That it is not replaced.
    // 2. That it is not being added again.
    const instructions2 = sd.merge({ source: src, destination: dst2 });
    expect(instructions2.length).to.equal(0);
  });

  it('should remove listeners', function () {
    const src = createElement('div', null, createElement('button'));
    const dst1 = sd.vdom.element('div', null, sd.vdom.element('button', { onclick }));
    const dst2 = sd.vdom.element('div', null, sd.vdom.element('button'));

    const instructions1 = sd.merge({ source: src, destination: dst1 });
    expect(instructions1.length).to.equal(1);

    const instructions2 = sd.merge({ source: src, destination: dst2 });
    expect(instructions2.length).to.equal(1);

    src.children[0].dispatchEvent(new CustomEvent('click'));
    expect(src.children[0].triggered).to.equal(undefined);
  });
});

describe('render', function () {
  it('should initially render and re-render', function () {
    const root = document.createElement('div');
    const render = sd.render(function (root) {
      return sd.vdom.element('div', null, sd.vdom.element('span', null, root.test));
    });

    ['test 1', 'test 1', 'test 2', 'test 2'].forEach(function (test) {
      root.test = test;
      render(root);
      assert.equal(root.innerHTML, `<div><span>${test}</span></div>`);
    });
  });
});
