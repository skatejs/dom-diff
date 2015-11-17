export default function createTextNode (item) {
  return {
    nodeType: 3,
    textContent: item
  };
}
