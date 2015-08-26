'use strict';

import * as types from '../src/types';
import diff from '../src/diff';
import patch from '../src/patch';
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

    patch(diff(src, dst));
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
  var diffed = diff(div(), div());
  test.ok(Array.isArray(diffed));
});

test('diff instruction object', function () {
  var src = div('<span></span>');
  var dst = div('<a></a>');
  var instructions = diff(src, dst);
  test.equal(instructions.length, 1, 'instruction length');
  test.equal(instructions[0].destination.tagName, 'A', 'destination tagName');
  test.equal(instructions[0].source.tagName, 'SPAN', 'source tagName');
  test.equal(instructions[0].type, types.REPLACE_CHILD, 'type');
});

test('patching host should not change', function () {
  var src = div('<span></span>');
  var dst = div('<a></a>');
  var instructions = diff(src, dst);
  patch(instructions);
  test.equal(src.tagName, 'DIV');
});

test('same elements should not change', function () {
  var src = div('<span></span>');
  var dst = div('<span></span><a></a>');
  var instructions = diff(src, dst);
  var srcSpan = src.childNodes[0];
  patch(instructions);
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
