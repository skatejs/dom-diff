import * as types from '../src/types';
import sd from '../src/index';

function elem (name, html) {
  var el = document.createElement(name);
  el.innerHTML = html;
  return el;
}

let div = elem.bind(null, 'div');

describe('diff', function () {
  it('instructions array', function () {
    var diffed = sd.diff({
      destination: div(),
      source: div()
    });
    assert.ok(Array.isArray(diffed));
  });

  it('instruction object', function () {
    var src = div('<span></span>');
    var dst = div('<a></a>');
    var instructions = sd.diff({
      destination: dst,
      source: src
    });
    assert.equal(instructions.length, 1, 'instruction length');
    assert.equal(instructions[0].destination.tagName, 'A', 'destination tagName');
    assert.equal(instructions[0].source.tagName, 'SPAN', 'source tagName');
    assert.equal(instructions[0].type, types.REPLACE_CHILD, 'type');
  });

  describe('descend', function () {
    it('on by default', function () {
      let src = div('<div stop><span></span></div>');
      let dst = div('<div stop><a></a></div>');
      let oldDiv = src.childNodes[0];
      let newA = dst.childNodes[0].childNodes[0];
      sd.merge({
        destination: dst,
        source: src
      });
      assert.equal(src.childNodes[0], oldDiv);
      assert.equal(src.childNodes[0].childNodes[0], newA);
    });

    it('user bypass', function () {
      let src = div('<div stop><span></span></div>');
      let dst = div('<div stop><a></a></div>');
      let oldDiv = src.childNodes[0];
      let oldSpan = oldDiv.childNodes[0];
      sd.merge({
        descend: src => !src.hasAttribute('stop'),
        destination: dst,
        source: src
      });
      assert.equal(src.childNodes[0], oldDiv);
      assert.equal(src.childNodes[0].childNodes[0], oldSpan);
    });
  })
});

describe('patch', function () {
  it('host should not change', function () {
    var src = div('<span></span>');
    var dst = div('<a></a>');
    var instructions = sd.diff({
      destination: dst,
      source: src
    });
    sd.patch(instructions);
    assert.equal(src.tagName, 'DIV');
  });

  it('same elements should not change', function () {
    var src = div('<span></span>');
    var dst = div('<span></span><a></a>');
    var instructions = sd.diff({
      destination: dst,
      source: src
    });
    var srcSpan = src.childNodes[0];
    sd.patch(instructions);
    assert.equal(src.childNodes[0], srcSpan);
  });

  it('only compares items at the same index', function () {
    var src = div('<span></span>');
    var dst = div('<a></a><span></span>');
    var instructions = sd.diff({
      destination: dst,
      source: src
    });
    var srcSpan = src.childNodes[0];
    sd.patch(instructions);
    assert.notEqual(src.childNodes[0], srcSpan);
    assert.notEqual(src.childNodes[1], srcSpan);
  });
});
