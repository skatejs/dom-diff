
  import main from '../lib/index.js';

  const previousGlobal = window.skatejsDomDiff;
  main.noConflict = function noConflict () {
    window.skatejsDomDiff = previousGlobal;
    return this;
  };
  window.skatejsDomDiff = main;

  export default main;
