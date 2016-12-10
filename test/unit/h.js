/* eslint-env jasmine, mocha */
/** @jsx h */

import { h } from '../../src';
import root from '../../src/util/root';

const { customElements, HTMLElement } = root;

describe('h', function () {
  it('should render a built-in element', function () {
    const vdom = <div />;
    expect(vdom.localName).to.equal('div');
  });

  it('should render a custom element', function () {
    const vdom = <x-div />;
    expect(vdom.localName).to.equal('x-div');
  });

  it('aria', () => {
    const vdom = <div aria={{ label: 'test' }} />;
    expect(vdom.attributes['aria-label']).to.equal('test');
    expect(vdom.properties['aria']).to.be.undefined;
  });

  it('data', () => {
    const vdom = <div data={{ label: 'test' }} />;
    expect(vdom.attributes['data-label']).to.equal('test');
    expect(vdom.properties['data']).to.be.undefined;
  });

  it('calls functions', () => {
    const Div = () => <div />;
    const vdom = <Div />;
    expect(vdom.localName).to.equal('div');
  });

  it('converts custom element construtors into tag names', () => {
    class CustomElement extends HTMLElement {}
    customElements.define('custom-element', CustomElement);
    const vdom = <CustomElement />;
    expect(vdom.localName).to.equal('custom-element');
  });
});
