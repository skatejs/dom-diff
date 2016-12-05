/* eslint-env jasmine, mocha */
/** @jsx h */

import { h } from '../../src';

describe('h', function () {
  it('should render a built-in element', function () {
    const vdom = <div />;
    expect(vdom.tagName).to.equal('DIV');
  });

  it('should render a custom element', function () {
    const vdom = <x-div />;
    expect(vdom.tagName).to.equal('X-DIV');
  });
});
