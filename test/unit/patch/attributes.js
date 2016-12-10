/* eslint-env jasmine, mocha */
/** @jsx h */

import { h } from '../../../src';
import { run } from '../../lib';

describe('patch/attributes', () => {
  it('add', () => {
    const dom = run(
      <div />,
      <div attributes={{ class: 'test' }} />
    );
    expect(dom.firstChild.getAttribute('class')).to.equal('test');
  });

  it('update', () => {
    const dom = run(
      <div attributes={{ class: 'test1' }} />,
      <div attributes={{ class: 'test2' }} />
    );
    expect(dom.firstChild.getAttribute('class')).to.equal('test2');
  });

  it('remove', () => {
    const dom = run(
      <div attributes={{ class: 'test1' }} />,
      <div />
    );
    expect(dom.firstChild.getAttribute('class')).to.equal(null);
  });

  it('does not affect props for unlinked attributes', () => {
    const dom = run(
      <div />,
      <div attributes={{ 'aria-label': 'test' }} />
    );
    expect(dom.firstChild.getAttribute('aria-label')).to.equal('test');
  });
});
