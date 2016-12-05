/* eslint-env jasmine, mocha */
/** @jsx h */

import { h } from '../../src';

describe('jsx', function () {
  it('should render a built-in element', function () {
    const el = <div />;
    expect(el.tagName).to.equal('DIV');
  });

  it('should render a custom element', function () {
    const el = <x-div />;
    expect(el.tagName).to.equal('X-DIV');
  });

  it('should set attributes', function () {
    const el = <div attr1={undefined} attr2={null} attr3={false} attr4={0} attr5={''} />;
    expect(el.attributes.attr1.name).to.equal('attr1');
    expect(el.attributes.attr2.name).to.equal('attr2');
    expect(el.attributes.attr3.name).to.equal('attr3');
    expect(el.attributes.attr4.name).to.equal('attr4');
    expect(el.attributes.attr5.name).to.equal('attr5');
    expect(el.attributes.attr1.value).to.equal(undefined);
    expect(el.attributes.attr2.value).to.equal(null);
    expect(el.attributes.attr3.value).to.equal(false);
    expect(el.attributes.attr4.value).to.equal(0);
    expect(el.attributes.attr5.value).to.equal('');
  });

  it('should bind events', function () {
    const el = <div onclick={function () {}} />;
    expect(el.events.click).to.be.a('function');
  });
});
