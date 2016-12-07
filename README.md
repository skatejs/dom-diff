# Dom Diff

Skate's DOM Diff is a virtual DOM library for diffing, patching and converting between virtual and real DOM trees.

[![Sauce Test Status](https://saucelabs.com/browser-matrix/skatejs-dom-diff.svg)](https://saucelabs.com/u/skatejs-dom-diff)

- Serialise to and from read DOM trees
- Diff virtual trees and patch real trees
- Web worker support

```sh
npm install skatejs-dom-diff
```

## Usage

### `diff(source, target, options)`

Diffs two virtual trees.

```js
/** @jsx h **/
import { diff, h } from 'skatejs-dom-diff';

const source = <div><span>source</span></div>;
const target = <div><span>target</span></div>;
const instructions = diff(source, target);
```

The `patchInstructions` is an `array` that can be passed to `patch()` to update the `source` tree. Before passing the instructions to `patch()`, however, your source tree must be associated to real DOM nodes. This can be done by using `mount()` or by converting them to a tree using `toDom()`.

### `fragment([virtualNodeOrNodes])`

Creates a virtual fragment. You can pass nothing to create an empty fragment:

```js
import { fragment } from 'skatejs-dom-diff';

const vFrag = fragment();
```

A single virtual node:

```js
import { fragment } from 'skatejs-dom-diff';

const vFrag = fragment(<div />);
```

An array of virtual nodes:

```js
import { fragment } from 'skatejs-dom-diff';

const vFrag = fragment([<div />, <span />]);
```

Or even a virtual fragment:

```js
import { fragment } from 'skatejs-dom-diff';

const vFrag = fragment(fragment(<div />));
```

### `h(name, props, ...childrenOrText)`

Creates a virtual node.

```js
// <div class="my-class">text or...<span /></div>
h('div', { className: 'my-class' }, 'text or...', h('span'));
```

Or you could just use JSX:

```js
/** @jsx h **/
// <div class="my-class">text or...<span /></div>
<div className="my-class">text or...<span /></div>
```

#### Attributes

By default, `h` only sets properties, but you can specify attributes you want to set by passing the special `attributes` prop:

```js
// <div class="my-class" />
<div attributes={{ class: 'my-class' }} />
```

#### Aria attributes

You can pass `aria-*` attributes using `attributes` but you can also specify the `aria` prop:

```js
// <div aria-label="my label" />
<div aria={{ label: 'my label' }} />
```

#### Data attributes

Like the `aria` prop, you can also use the `data` prop:

```js
// <div data-something="my data" />
<div data={{ something: 'my data' }} />
```

#### Events

Events are bound using the special `events` prop:

```js
const click = e => doSomethingWith(e);
<div events={{ click }} />
```

### `merge()`

The `merge()` function is convenience for calling `diff()` and `patch()` sequentially. As with `diff()`, you must ensure the `source` virtual tree has been associated to real nodes first.

```js
/** @jsx h **/
import { diff, h } from 'skatejs-dom-diff';

const source = <div><span>source</span></div>;
const target = <div><span>target</span></div>;
const dom = mount(source, target);
merge(source, target);
```

### `mount(vdom[, root])`

Mounts the `vdom` to the real `root` DOM node. It returns the `root` node. If the `root` node was not specified, it automatically creates a `<div />` and returns it.

```js
/** @jsx h **/
import { h, mount } from 'skatejs-dom-diff';

const div = mount(<p>some text</p>);
```

Is the same thing as:

```js
/** @jsx h **/
import { h, mount } from 'skatejs-dom-diff';

const div = document.createElement('div');
mount(<p>some text</p>, div);
```

It's more than likely that you'll just mount it directly to the document:

```js
/** @jsx h **/
import { h, mount } from 'skatejs-dom-diff';

mount(<p>some text</p>, document.getElementById('app'));
```

### `patch()`

Takes instructiosn created using `diff()` and performs them on the associated DOM nodes that each instructions is for.

```js
/** @jsx h **/
import { diff, h, mount, patch } from 'skatejs-dom-diff';

const source = <p>source tree</p>;
const target = <p>target tree</p>;
const instructions = diff(source, target);

mount(source, document.getElementById('app'));
patch(instructions);
```

### `render()`

A highly convenient function for continually rendering a given template.

```js
/** @jsx h **/
import { h, render } from 'skatejs-dom-diff';

const root = document.getElementById('app');
const renderer = render((root) => (
  <p>{root.someProp}</p>
));

// Set the prop to render with
root.someProp = 'test 1';

// Initial render: <p>test 1</p>
renderer(root);

// Update the prop
root.someProp = 'test 2';

// Re-render: <p>test 2</p>
renderer(root);
```

### `text()`

Returns a virtual text node:

```js
import { text } from 'skatejs-dom-diff';

const vText = text('my text node');
```

### `toDom()`

Convers a virtual tree to a *real* DOM tree, event listeners and all:

```js
import { toDom } from 'skatejs-dom-diff';

const vdom = <p>I will soon be real!</p>
const dom = toDom(vdom);

// <p>I will soon be real!</p>
console.log(dom.outerHTML);
```

### `toVdom()`

Converts a real DOM tree into a virtual tree. It only copies over attributes. Event listeners can't be copied because the standard DOM APIs don't provide a way to get bound listeners.

*Properties currently aren't copied either, but is being worked on.*

```js
import { toVdom } from 'skatejs-dom-diff';

const dom = document.createElement('p');
dom.textContent = 'I will soon be fake!';

const vdom = toVdom(dom);
```

### `types`

The types of patches that can occur. Currently these are:

```js
import { types } from 'skatejs-dom-diff';

const {
  APPEND_CHILD,
  REMOVE_CHILD,
  REMOVE_ATTRIBUTE,
  REPLACE_CHILD,
  SET_ATTRIBUTE,
  SET_EVENT,
  SET_PROPERTY,
  TEXT_CONTENT
} = types;
```

### Web workers

You can tell the differ to do its work in a web worker simply by passing a `done` callback option to any of the three major entry functions (`diff()`, `merge()`, `render()`).

#### `diff()`

In the case of `diff()`, it's called once the diffing algorithm has finished in the worker and passed the `instructions`. The patch `instructions` are the only argument passed into the callback.

```js
function done (instructions) {
  patch(instructions);
}
diff({ source, destination, done });
```

#### `merge()`

For `done()`, it's passed in the same exact way. The only difference is that it's called after the patch is performed but it's still passed the instructions that were performed by the patch algorithm.

```js
function done (instructions) {
  // The DOM has been updated, do what you want here.
}
merge({ source, destination, done });
```

#### `render()`

And for `render()`, it is the same as the `merge()` function. So once the vDOM is rendered and DOM is patched, `done()` is called with the instructions that were performed.

```js
function done (instructions) {
  // Renering and patching is done...
}
const root = document.createElement('div');
const doRender = render(function (root) {
  return sd.vdom.element('div', null, root.test);
});

div.test = 'initial text';
doRender(div, done);
div.test = 'updated text';
doRender(div, done);
```
