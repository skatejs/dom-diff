/* eslint-env jasmine, mocha */
/** @jsx h */

import { h, toDom } from '../../src';

const { CustomEvent } = window;

describe('toDom', function () {
  it('should set properties', () => {
    const clk = () => {};
    const dom = toDom(<div onclick={clk} />);
    expect(dom.onclick).to.equal(clk);
    expect(dom.getAttribute('onclick')).to.equal(null);
  });

  it('should set attributes', function () {
    const dom = toDom(<div attributes={{ test: true }} />);
    expect(dom.nonstandard).to.equal(undefined);
    expect(dom.getAttribute('test')).to.equal('true');
  });

  it('should set events', function () {
    const dom = toDom(<div events={{ test: e => (e.target.triggered = true) }} />);
    dom.dispatchEvent(new CustomEvent('test'));
    expect(dom.test).to.equal(undefined);
    expect(dom.getAttribute('test')).to.equal(null);
    expect(dom.triggered).to.equal(true);
  });
});
