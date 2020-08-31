const BuiltinModule = require('module');
const resolveFilename = require('./resolveFilename');

const Module = module.constructor.length > 1 ? module.constructor : BuiltinModule;

Module._resolveFilename = resolveFilename;