var del = require('del');

module.exports = function () {
  return del(['dist', 'lib']);
};
