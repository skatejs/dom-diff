/* eslint-env jasmine, mocha */
/** @jsx h */

import 'custom-event-polyfill';
import { h } from '../../../src/index';
import { run } from '../../lib';
import root from '../../../src/util/root';

const { CustomEvent } = root;

describe('patch/events', function () {
  const click = e => (e.target.triggered = true);

  it('should add listeners', function () {
    const dom = run(<button />, <button events={{ click }} />);
    const btn = dom.children[0];

    expect(btn.hasAttribute('onclick')).to.equal(false);
    expect(btn.onclick).to.equal(null);

    btn.dispatchEvent(new CustomEvent('click'));
    expect(btn.triggered).to.equal(true);
  });

  it('should replace listeners', function () {
    const onclickOverride = e => (e.target.triggeredOverride = true);
    const dom = run(<button events={{ click }} />, <button events={{ click: onclickOverride }} />);
    const btn = dom.children[0];

    btn.dispatchEvent(new CustomEvent('click'));
    expect(btn.triggered).to.equal(undefined);
    expect(btn.triggeredOverride).to.equal(true);
  });

  it('should remove listeners', function () {
    const dom = run(<button events={{ click }} />, <button />);
    const btn = dom.firstChild;

    btn.dispatchEvent(new CustomEvent('click'));
    expect(btn.triggered).to.equal(undefined);
  });
});
