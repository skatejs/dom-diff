# Dom Diff

Skate's DOM Diff is library that will diff real dom nodes using a simple algorithm designed to be balanced between performance and accuracy. It uses a similar algorithm that React uses and makes similar assumptions.

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
{
  destination: HTMLDivElement,
  source: HTMLSpanElement,
  type: skateDomDiff.types.REPLACE_CHILD
}
```
