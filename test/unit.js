import 'custom-event-polyfill';
import 'skatejs-web-components';

const reqTests = require.context('./unit', true, /^.*\.js$/);
reqTests.keys().map(reqTests);
