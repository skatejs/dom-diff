import * as types from '../src/types';
import sd from '../src/index';

function elem (name, html) {
  let el = document.createElement(name);
  el.innerHTML = html;
  return el;
}

let div = elem.bind(null, 'div');

describe('diff', function () {
  it('instructions array', function () {
    let diffed = sd.diff({
      destination: div(),
      source: div()
    });
    assert.ok(Array.isArray(diffed));
  });

  it('instruction object', function () {
    let src = div('<span></span>');
    let dst = div('<a></a>');
    let instructions = sd.diff({
      destination: dst,
      source: src
    });
    assert.equal(instructions.length, 1, 'instruction length');
    assert.equal(instructions[0].destination.tagName, 'A', 'destination tagName');
    assert.equal(instructions[0].source.tagName, 'SPAN', 'source tagName');
    assert.equal(instructions[0].type, types.REPLACE_CHILD, 'type');
  });
});

describe('patch', function () {
  it('host should not change', function () {
    let src = div('<span></span>');
    let dst = div('<a></a>');
    let instructions = sd.diff({
      destination: dst,
      source: src
    });
    sd.patch(instructions);
    assert.equal(src.tagName, 'DIV');
  });

  it('same elements should not change', function () {
    let src = div('<span></span>');
    let dst = div('<span></span><a></a>');
    let instructions = sd.diff({
      destination: dst,
      source: src
    });
    let srcSpan = src.childNodes[0];
    sd.patch(instructions);
    assert.equal(src.childNodes[0], srcSpan);
  });

  it('only compares items at the same index', function () {
    let src = div('<span></span>');
    let dst = div('<a></a><span></span>');
    let instructions = sd.diff({
      destination: dst,
      source: src
    });
    let srcSpan = src.childNodes[0];
    sd.patch(instructions);
    assert.notEqual(src.childNodes[0], srcSpan);
    assert.notEqual(src.childNodes[1], srcSpan);
  });

  it('should not patch equal text nodes', function () {
    let src = div('text');
    let dst = div('text');
    let text = src.childNodes[0];
    sd.merge({ source: src, destination: dst });
    assert.equal(text, src.childNodes[0]);
  });

  it('should patch on subsequent runs', function () {
    let src = div('test 1');

    sd.merge({ source: src, destination: div('test 2') });
    assert.equal(src.textContent, 'test 2');

    sd.merge({ source: src, destination: div('test 3') });
    assert.equal(src.textContent, 'test 3');
  });
});

describe('vdom/dom', function () {
  it('should create a real element from a virtual element', function () {
    const vEl = sd.vdom.element('div');
    const rEl = sd.vdom.dom(vEl);
    expect(rEl.tagName).to.equal('DIV');
  });

  describe('attributes', function () {
    it('should set attributes if they are a string', function () {
      const vEl = sd.vdom.element('div', {
        key1: null ,
        key2: 'val2'
      });
      expect(vEl.attributes.key1).to.equal(undefined);
      expect(vEl.attributes.key2.name).to.equal('key2');
      expect(vEl.attributes.key2.value).to.equal('val2');
    });

    it('should set events if the name begins with "on"', function () {
      const vEl = sd.vdom.element('div', {
        click: () => 'click',
        onclick: () => 'onclick',
        once: () => 'once'
      });
      expect(vEl.events.click()).to.equal('onclick');

      // This is currently expected behaviour, but we are looking for ways to
      // get around this.
      //
      // https://github.com/skatejs/dom-diff/issues/32
      expect(vEl.events.ce()).to.equal('once');
    });

    it('should set properties if the value is does not meet attribute or event requirements, but not if it is undefined', function () {
      const vEl = sd.vdom.element('div', {
        key1: false,
        key2: 0,
        key3: null,
        key4: undefined
      });
      expect(vEl.properties.key1).to.equal(false);
      expect(vEl.properties.key2).to.equal(0);
      expect(vEl.properties.key3).to.equal(null);
      expect(Object.hasOwnProperty(vEl, 'key4')).to.equal(false);
    });
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
