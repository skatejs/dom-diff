'use strict';

import * as types from '../src/types';
import sd from '../src/index';
import test from 'tipple';

function elem (name, html) {
  var el = document.createElement(name);
  el.innerHTML = html;
  return el;
}

let div = elem.bind(null, 'div');

function testPatch (srcHtml, dstHtml, nonDestructiveMap = {}) {
  test(`patching "${srcHtml}" with "${dstHtml}"`, function () {
    var src = div(srcHtml);
    var dst = div(dstHtml);
    var originalNodes = [].slice.call(src.childNodes);

    sd.patch(sd.diff({
      destination: dst,
      source: src
    }));

    test.equal(src.innerHTML, dstHtml);

    for (let a in nonDestructiveMap) {
      let b = nonDestructiveMap[a];
      let origin = originalNodes[a];

      if (b === null) {
        test.equal(origin.parentNode, null, `${origin.outerHTML} should have been removed `);
      } else {
        let actual = src.childNodes[b];
        test.equal(origin, actual, `${a}: ${origin.outerHTML} should be ${actual.outerHTML}`);
      }
    }
  });
}

test('diff instructions array', function () {
  var diffed = sd.diff({
    destination: div(),
    source: div()
  });
  test.ok(Array.isArray(diffed));
});

test('diff instruction object', function () {
  var src = div('<span></span>');
  var dst = div('<a></a>');
  var instructions = sd.diff({
    destination: dst,
    source: src
  });
  test.equal(instructions.length, 1, 'instruction length');
  test.equal(instructions[0].destination.tagName, 'A', 'destination tagName');
  test.equal(instructions[0].source.tagName, 'SPAN', 'source tagName');
  test.equal(instructions[0].type, types.REPLACE_CHILD, 'type');
});

test('patching host should not change', function () {
  var src = div('<span></span>');
  var dst = div('<a></a>');
  var instructions = sd.diff({
    destination: dst,
    source: src
  });
  sd.patch(instructions);
  test.equal(src.tagName, 'DIV');
});

test('same elements should not change', function () {
  var src = div('<span></span>');
  var dst = div('<span></span><a></a>');
  var instructions = sd.diff({
    destination: dst,
    source: src
  });
  var srcSpan = src.childNodes[0];
  sd.patch(instructions);
  test.equal(src.childNodes[0], srcSpan);
});

testPatch('<span></span>', '<a></a>');
testPatch('<span></span>', '<span></span><a></a>', {
  0: 0
});
testPatch('<span></span>', '<a></a><span></span>', {
  0: 1
});
testPatch('<span></span>', '<span></span><a></a><span></span>', {
  0: 0
});
testPatch('<a></a><span></span>', '<span></span><a></a>', {
  0: 1,
  1: 0
});
testPatch('<two></two><one></one><three></three>', '<one></one><two></two><three></three>', {
  0: 1,
  1: 0,
  2: 2
});
testPatch('<three></three><two></two><three></three><one></one>', '<one></one><two></two><three></three><three></three>', {
  0: 3,
  1: 1,
  2: 2,
  3: 0
});
testPatch('<three></three><two></two><remove></remove><three></three><one></one>', '<one></one><two></two><three></three><three></three>', {
  0: 2,
  1: 1,
  2: null,
  3: 3,
  4: 0
});
testPatch('<div class="something"></div>', '<div class="something else"></div>', {
  0: 0
});

test('should descend by default', function () {
  let src = div('<div stop><span></span></div>');
  let dst = div('<div stop><a></a></div>');
  let oldDiv = src.childNodes[0];
  let newA = dst.childNodes[0].childNodes[0];
  sd.merge({
    destination: dst,
    source: src
  });
  test.equal(src.childNodes[0], oldDiv);
  test.equal(src.childNodes[0].childNodes[0], newA);
});

test('should allow user to prevent descending (useful for web components to control their own trees)', function () {
  let src = div('<div stop><span></span></div>');
  let dst = div('<div stop><a></a></div>');
  let oldDiv = src.childNodes[0];
  let oldSpan = oldDiv.childNodes[0];
  sd.merge({
    descend: src => !src.hasAttribute('stop'),
    destination: dst,
    source: src
  });
  test.equal(src.childNodes[0], oldDiv);
  test.equal(src.childNodes[0].childNodes[0], oldSpan);
});
