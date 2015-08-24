'use strict';

let queue = [];

function test (name, func) {
  queue.push([name, func]);
  return test;
}

test.equal = function (left, right, message = 'equal: ') {
  this.ok(left === right, `${message}: expected "${left}" to equal "${right}"`);
};

test.ok = function (expr, message = 'Assertion failed.') {
  if (!expr) {
    throw new Error(message);
  }
};

test.run = function () {
  let index = -1;
  let failures = [];

  function done () {
    ++index;
    let data = queue[index];

    if (!data) {
      return console.log(`# ${ failures ? 'fail ' + failures.length : 'ok' }`);
    }

    let desc = data[0];
    let func = data[1];

    try {
      let async = false;
      let pass = function () {
        console.log(`ok ${index + 1} - ${desc}`);
        done();
      };

      func(function () {
        async = true;
        return pass;
      });

      if (!async) {
        pass();
      }
    }
    catch (e) {
      console.log(`not ok ${index + 1} - ${desc}`);
      console.error(`# ${e.stack.split('\n').join('\n #')}`);
      failures.push(e);
      done();
    }
  }

  console.log(`1..${queue.length}`);
  done();
};

if (document) {
  document.addEventListener('DOMContentLoaded', test.run);
}

export default test;
