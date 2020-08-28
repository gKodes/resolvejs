interface ConfigForOptions {
  app?: String;
  ext?: Array<String> | String;
  config?: Array<String> | String;
}

interface DoExistsOptions {
  exts?: Array<String> | String;
  files: Array<String> | String;
}

interface LookUpOptions extends DoExistsOptions {
  cwd: String
}
