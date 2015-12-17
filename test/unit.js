import 'custom-event-polyfill';
import * as types from '../src/types';
import sd from '../src/index';

function createElement (...args) {
  return sd.vdom.dom(sd.vdom.element.apply(null, args));
}

describe('vdom/element', function () {
  const create = sd.vdom.element;
  
  it('should render a built-in element', function () {
    const el = create('div');
    expect(el.tagName).to.equal('DIV');
  });
  
  it('should render a custom element', function () {
    const el = create('x-div');
    expect(el.tagName).to.equal('X-DIV');
  });
  
  it('should set attributes', function () {
    const el = create('div', { attr1: undefined, attr2: null, attr3: false, attr4: 0, attr5: '' });
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
    const el = create('div', { onclick: function(){} });
    expect(el.events.click).to.be.a('function');
  });
});

describe('jsx', function () {
  const React = { createElement: sd.vdom.element };
  
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
    const el = <div onclick={function(){}} />;
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
  const onclick = e => e.target.triggered = true;
  
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
    const src = createElement('div', null, createElement('button'));
    const dst1 = sd.vdom.element('div', null, sd.vdom.element('button', { onclick }));
    const dst2 = sd.vdom.element('div', null, sd.vdom.element('button', { onclick: function(){} }));
    
    const instructions1 = sd.merge({ source: src, destination: dst1 });
    expect(instructions1.length).to.equal(1);
    
    const instructions2 = sd.merge({ source: src, destination: dst2 });
    expect(instructions2.length).to.equal(1);
  });
  
  it('should not replace same listeners', function () {
    const src = createElement('div', null, createElement('button'));
    const dst1 = sd.vdom.element('div', null, sd.vdom.element('button', { onclick }));
    const dst2 = sd.vdom.element('div', null, sd.vdom.element('button', { onclick }));
    
    const instructions1 = sd.merge({ source: src, destination: dst1 });
    expect(instructions1.length).to.equal(1);
    
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

describe('content property', function () {
  function initialiseTemplate (elem) {
    elem.innerHTML = '<p>shadow dom</p><div class="content"></div>';
  }

  function defineContentProperty (elem) {
    Object.defineProperty(elem, 'content', {
      get () {
        return this.querySelector('.content');
      }
    });
  }

  // This test only needs to be run for native custom elements.
  document.registerElement && it('if it returns a Node, then that node should be used to add the vDOM content', function () {
    const name = 'prop-test-1';
    document.registerElement(name, {
      prototype: Object.create(HTMLElement.prototype, {
        createdCallback: {
          value () {
            initialiseTemplate(this);
            defineContentProperty(this);
          }
        }
      })
    });

    const vEl = sd.vdom.element(name, null, sd.vdom.element('span', null, 'light dom'));
    const rEl = sd.vdom.dom(vEl);
    expect(rEl.outerHTML).to.equal('<prop-test-1><p>shadow dom</p><div class="content"><span>light dom</span></div></prop-test-1>');
  });

  // This can be run for any browsers since it's possible to define a "content"
  // property on any object.
  it('if it returns a Node, then that node should be used for patching', function () {
    const elem = document.createElement('div');
    const render = sd.render(function (elem) {
      return sd.vdom.element('div', null,
        elem.test && elem.test.map(function (child) {
          return sd.vdom.element(child.name, null, child.text);
        })
      );
    });

    initialiseTemplate(elem);
    defineContentProperty(elem);

    render(elem);
    expect(elem.outerHTML).to.equal('<div><p>shadow dom</p><div class="content"><div></div></div></div>', 'initial render');

    elem.test = [{ name: 'span', text: '1' }];
    render(elem);
    expect(elem.outerHTML).to.equal('<div><p>shadow dom</p><div class="content"><div><span>1</span></div></div></div>', 'append first');

    elem.test = [{ name: 'div', text: '1' }, { name: 'span', text: '2' }];
    render(elem);
    expect(elem.outerHTML).to.equal('<div><p>shadow dom</p><div class="content"><div><div>1</div><span>2</span></div></div></div>', 'replace first, append last');

    elem.test = [{ name: 'div', text: '1' }, { name: 'div', text: '2' }];
    render(elem);
    expect(elem.outerHTML).to.equal('<div><p>shadow dom</p><div class="content"><div><div>1</div><div>2</div></div></div></div>', 'keep first, replace last');

    elem.test = [{ name: 'div', text: '1' }];
    render(elem);
    expect(elem.outerHTML).to.equal('<div><p>shadow dom</p><div class="content"><div><div>1</div></div></div></div>', 'keep first, remove last');

    elem.test = null;
    render(elem);
    expect(elem.outerHTML).to.equal('<div><p>shadow dom</p><div class="content"><div></div></div></div>', 'remove all');
  });
});
