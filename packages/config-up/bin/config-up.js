#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const { execSync } = require('child_process');
const assert = require('assert');
const debug = require('debug')('config-up');
const configFor = require('../lib/configFor');
const { getKnownConfig } = require('../lib/knownConfigs');

const argv = minimist(process.argv.slice(2), {
  alias: {
    'config-name': 'c',
    'config-ext': 'e',
  },
});

let {
  _: [script, ...args],
  ['config-name']: configName,
  ['config-ext']: configExt = ['js', 'json'],
} = argv;

// Handle the NPM Script
const { npm_lifecycle_script } = process.env;
if (npm_lifecycle_script) {
  [script, ...args] = npm_lifecycle_script.split(' ').splice(1);
}

let lookUpFor = {};
if (script) {
  lookUpFor = getKnownConfig(script);
} else {
  lookUpFor = { config: configName, exts: configExt };
}

const CONFIG_AT = configFor(lookUpFor);
if (!CONFIG_AT) {
  console.info(`Unable find config for ${script}`);
  process.exit(1);
}

const subProcessEnv = {
  CONFIG_AT,
  config_up_config: CONFIG_AT,
  config_up_found_at: path.dirname(CONFIG_AT),
  ...process.env,
};

if ( lookUpFor.arg && !args.includes(lookUpFor.arg) ) {
  args = `${args} ${lookUpFor.arg} ${CONFIG_AT}`;
}

const command = `${script} ${args.join(' ')} `;

execSync(command, {
  cwd: process.cwd(),
  env: subProcessEnv,
  stdio: 'inherit',
});
