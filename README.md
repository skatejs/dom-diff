# Dom Diff

Skate's DOM Diff is a library can diff and patch both real and virtual DOMs trees.

## Installing

```sh
npm install skatejs-dom-diff
```

## Including

You can use any module format. UMD is in `lib`, ES6 is in `src` and the global `skateDomDiff` is exported from `dist`. The `package.json` points to `lib` so you're probably safe just doing something like:

```js
import skateDomDiff from 'skatejs-dom-diff';
```

## Usage

It will diff the trees of two nodes, excluding the root nodes themselves.

```js
var fragment1 = document.createDocumentFragment();
var fragment2 = document.createDocumentFragment();

fragment1.appendChild(document.createElement('span'));
fragment2.appendChild(document.createElement('div'));

var instructions = skateDomDiff.diff({
  // The fragment that you want the source to look like.
  destination: fragment2,

  // The fragment that you want to make look like the destination.
  source: fragment1
});

console.log(instructions);
```

Would log:

```js
[{
  source: [object HTMLSpanElement],
  destination: [object HTMLDivElement],
  type: [number skateDomDiff.types.REPLACE_CHILD]
}]
```

You can then take the instructions and `patch()` the source node.

```js
skateDomDiff.patch(instructions);
```

If you want to do this all in one go, use `merge()`.

```js
skateDomDiff.merge({
  source: fragment1,
  destination: fragment2
});
```

### Virtual DOM usage

The algorithm for determining differences between DOM nodes utilises properties on the nodes to gather information about them and because of this, you can simply inject a virtual tree instead of a DOM tree.

It comes with a simple, lightweight virtual DOM implementation but you can use anything that implements the following interface:

```js
const element = {
  // The name of the node. Must be uppercase.
  tagName: 'TAG-NAME',

  // The same thing as `nodeType` on a normal element.
  nodeType: 1,

  // An object that mimics a named-node map. It must have a `length` attribute
  // and be able to be accessed by index as well as by name. In the example
  // below both `0` and `name` should refer to the same object.
  attributes: {
    0: { name: 'name', value: 'value' },
    name: { name: 'name', value: 'value' },
    length: 1
  },

  // An array of virtual children. Each item will be an object like this one.
  childNodes: []
};

const text = {
  nodeType: 3,
  textContent: 'text content'
};
```

#### Constructing a virtual tree

There is a built-in function for creating virtual elements:

```js
import el from 'skatejs-dom-diff/vdom/element';

el('div', null,
  'Hello, ',
  el('span', { style: 'font-weight: bold'}, 'World!')
);
```

The above would generate:

```js
{
  tagName: 'DIV',
  nodeType: 1,
  childNodes: [
    {
      nodeType: 3,
      textContent: 'Hello'
    }, {
      tagName: 'SPAN',
      nodeType: 1,
      attributes: {
        0: { name: 'style', value: 'font-weight: bold' },
        style: { name: 'style', value: 'font-weight: bold' },
        length: 1
      },
      childNodes: [
        {
          nodeType: 3,
          textContent: 'World!'
        }
      ]
    }
  ]
}
```

That information is then used to diff and generate patch instructions for the real DOM nodes. Upon initial mounting, the entire virtual tree is used to create the initial structure.

#### Diffing and patching a virtual tree

Diffing a virtual tree is almost the same as diffing real nodes except that you must mount your virtual tree to an empty node before you can diff that tree with a new tree.

```js
import merge from 'skatejs-dom-diff/src/merge';
import mount from 'skatejs-dom-diff/src/vdom/mount';

const container = document.getElementById('container');
let oldTree = el('div');
let newTree = el('span');

mount(container, tree);
merge({
  destination: newTree,
  source: oldTree
});
```

There is a built-in renderer that will do all of this for you.

```js
import el from 'skatejs-dom-diff/src/vdom/element';
import render from 'skatejs-dom-diff/src/render';

// Create a function that takes props and will
const renderer = render(function (root) {
  return el('div', { class: root.propName });
});

// The renderer is called against a real node as it will be mounted to this
// node. As shown above, you can also use this node for information.
document.body.propName = 'something';
renderer(document.body);

// And then re-render.
document.body.propName = 'something else';
renderer(document.body);
```

The above would render:

```html
<!-- initial render -->
<body>
  <div class="something"></div>
</body>

<!-- re-render -->
<body>
  <div class="something else"></div>
</body>
```

The only thing that would change would be the `class` attribute on the `<div>` since the node itself doesn't need to be replaced.

#### JSX

JSX works out of the box, even if it's compiling down to `React.createElement` calls. All you have to do is define a second argument to your renderer:

```js
const renderer = render(function (root, React) {
  return <div class={root.propName} />;
});
```

This is useful when you want to avoid extra transpilation steps, but you can transpile down to anything you want as long as it has a `createElement` function on the second argument.

#### Attribute conventions

When you specify attributes to the function that creates a virtual element, it will apply the following conventions - in the specified order - to each one.

1. If the attribute value is a `string`, it will be set as an attribute.
2. If the attribute name begins with `on`, the value will be added as the corresponding event listener (but only if it is a function, otherwise it's a no-op). For example, if you specified `{ onclick: handler }`, then internally it does something like `element.addEventListener('click', handler)`.
3. If 1 or 2 is not met, then it is set as a property.

This comes in handy when using JSX because you can do stuff like:

```js
<input type="checkbox" checked={true} onchange={function(){}} />
```

The resulting HTML would be:

```html
<input type="checkbox">
```

Additionally, it would have the `checked` property set to `true` and the `change` event would be handled by the value passed to `onchange`.

#### Attribute patching behaviour

When diffing and patching, the behaviour is much the same. If you're diffing real DOM nodes, then events and properties are ignored. Those are only available to virtual trees unless the element has an `events` and / or `properties` object on them. This is an implementation detail and may change and / or be formalised in the future. Nonetheless, it's something to be aware of.

When patching event listeners, the previous one will be completely unbound and the new one will be bound. This prevents handlers from stacking.

When patching properties, they're simply just set if the source and destination values aren't the same.
