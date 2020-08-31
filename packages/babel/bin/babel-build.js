#!/usr/bin/env node
'use strict';
let configForSync;

try {
  configForSync = require('@resolvejs/config-up/lib/configFor');
} catch (errNoConfig) { console.info('unable to find config-up module in the lookup tree', module.paths) }

const path = require('path');
const DEAFULT_FLAGS = ['--delete-dir-on-start', '--no-comments'];
process.argv.push('--config-file', configForSync('babel'));

if ( !process.argv.includes('--out-dir') ) {
  process.argv.push('--out-dir', 'dist');
}

DEAFULT_FLAGS.forEach(flag => {
  if ( !process.argv.includes(flag) ) {
    process.argv.push(flag);
  }
});

process.argv.push('--ignore', '**/__*__,**/*.spec.js,**/*.test.js');

require('@babel/cli/lib/babel');
