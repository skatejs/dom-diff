/* eslint-env jasmine, mocha */

import 'custom-event-polyfill';
import { h, merge, toDom, types } from '../../../src/index';

const { CustomEvent } = window;

function createElement (...args) {
  return toDom(h.apply(null, args));
}

describe('events', function () {
  const onclick = e => (e.target.triggered = true);

  it('should add listeners', function () {
    const src = createElement('div', null, createElement('button'));
    const dst = h('div', null, h('button', { onclick }));
    const instructions = merge({ source: src, destination: dst });

    // The instruction should explicitly set an event.
    expect(instructions.length).to.equal(1);
    expect(instructions[0].type).to.equal(types.SET_EVENT);
    expect(instructions[0].data.name).to.equal('click');
    expect(instructions[0].data.value).to.equal(onclick);

    // It should be added via addEventListener().
    expect(src.children[0].hasAttribute('onclick')).to.equal(false);
    expect(src.children[0].onclick).to.equal(null);

    src.children[0].dispatchEvent(new CustomEvent('click'));
    expect(src.children[0].triggered).to.equal(true);
  });

  it('should replace different listeners', function () {
    const noop = function () {};
    const src = createElement('div', null, createElement('button'));
    const dst1 = h('div', null, h('button', { onclick }));
    const dst2 = h('div', null, h('button', { onclick: noop }));

    const instructions1 = merge({ source: src, destination: dst1 });
    expect(instructions1.length).to.equal(1);
    expect(instructions1[0].type).to.equal(types.SET_EVENT);
    expect(instructions1[0].data.name).to.equal('click');
    expect(instructions1[0].data.value).to.equal(onclick);

    const instructions2 = merge({ source: src, destination: dst2 });
    expect(instructions2.length).to.equal(2);
    expect(instructions2[0].type).to.equal(types.SET_EVENT);
    expect(instructions2[0].data.name).to.equal('click');
    expect(instructions2[0].data.value).to.equal(undefined);
    expect(instructions2[1].type).to.equal(types.SET_EVENT);
    expect(instructions2[1].data.name).to.equal('click');
    expect(instructions2[1].data.value).to.equal(noop);
  });

  it('should not replace or add same listeners', function () {
    const src = createElement('div', null, createElement('button'));
    const dst1 = h('div', null, h('button', { onclick }));
    const dst2 = h('div', null, h('button', { onclick }));

    const instructions1 = merge({ source: src, destination: dst1 });
    expect(instructions1.length).to.equal(1);

    // Since we are passing the same handler here and are testing that there
    // no instructions, we are testing both:
    //
    // 1. That it is not replaced.
    // 2. That it is not being added again.
    const instructions2 = merge({ source: src, destination: dst2 });
    expect(instructions2.length).to.equal(0);
  });

  it('should remove listeners', function () {
    const src = createElement('div', null, createElement('button'));
    const dst1 = h('div', null, h('button', { onclick }));
    const dst2 = h('div', null, h('button'));

    const instructions1 = merge({ source: src, destination: dst1 });
    expect(instructions1.length).to.equal(1);

    const instructions2 = merge({ source: src, destination: dst2 });
    expect(instructions2.length).to.equal(1);

    src.children[0].dispatchEvent(new CustomEvent('click'));
    expect(src.children[0].triggered).to.equal(undefined);
  });
});
