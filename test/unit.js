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
