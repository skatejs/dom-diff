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

function testPatch (srcHtml, dstHtml) {
  test(`patching "${srcHtml}" with "${dstHtml}"`, function () {
    var src = div(srcHtml);
    var dst = div(dstHtml);
    patch(diff(src, dst));
    test.equal(src.innerHTML, dstHtml);
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

testPatch('<span></span>', '<a></a>');
testPatch('<span></span>', '<span></span><a></a>');
testPatch('<span></span>', '<a></a><span></span>');
testPatch('<span></span>', '<span></span><a></a><span></span>');
