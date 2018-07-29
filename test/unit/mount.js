/* eslint-env jasmine, mocha */
/** @jsx h */

import { h, mount } from '../../src';

describe('mount', () => {
  it('should accept a single argument', () => {
    const app = mount(<span />);
    expect(app.localName).to.equal('div');
    expect(app.childNodes.length).to.equal(1);
    expect(app.firstChild.localName).to.equal('span');
  });

  it('should accept a mount node', () => {
    const div = document.createElement('div');
    const app = mount(<span />, div);
    expect(app.localName).to.equal('div');
    expect(app.childNodes.length).to.equal(1);
    expect(app.firstChild.localName).to.equal('span');
  });

  it('should accept a mount selector', () => {
    const div = document.createElement('div');
    div.id = 'test-mount-node';
    document.body.appendChild(div);

    const app = mount(<span />, '#test-mount-node');
    expect(app.localName).to.equal('div');
    expect(app.childNodes.length).to.equal(1);
    expect(app.firstChild.localName).to.equal('span');

    document.body.removeChild(div);
  });

  it('should error if mount selector does not exist', () => {
    const selector = 'some-non-existent-node';
    expect(() => mount(<span />, selector))
      .to.throw(`No mount node found for selector: ${selector}`);
  });
});
