/* eslint-env jasmine, mocha */

import { toVdom } from '../../src';

function assert (dom, { fragment } = { fragment: false }) {
  let vdom = toVdom(dom);

  if (fragment) {
    vdom = vdom.childNodes[0];
  }

  expect(vdom.localName).to.equal('div');
  expect(vdom.attributes.name1).to.equal('value1');
  expect(vdom.childNodes.length).to.equal(1);

  const span = vdom.childNodes[0];

  expect(span.localName).to.equal('span');
  expect(span.attributes.name2).to.equal('value2');
  expect(span.childNodes.length).to.equal(1);

  const text = span.childNodes[0];

  expect(text.nodeType).to.equal(3);
  expect(text.textContent).to.equal('test');
}

describe('toVdom', () => {
  it('html string', () => {
    assert('<div name1="value1"><span name2="value2">test</span></div>', { fragment: true });
  });

  it('element', () => {
    const dom = document.createElement('div');
    dom.innerHTML = '<div name1="value1"><span name2="value2">test</span></div>';
    assert(dom.firstElementChild, { fragment: false });
  });

  it('document fragment', () => {
    const dom = document.createElement('div');
    const fra = document.createDocumentFragment();
    dom.innerHTML = '<div name1="value1"><span name2="value2">test</span></div>';
    fra.appendChild(dom.firstElementChild);
    assert(fra, { fragment: true });
  });
});
