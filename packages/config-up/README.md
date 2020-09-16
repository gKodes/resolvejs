# @resolvejs/config-up

CLI Utility/Library to help look-up for a configuration file recursively up till the `node_modules` where config-up is installed.

>**NOTE** This is help-full for mon-repo packages where you can manage one config for across all workspaces

## Usage

### CLI / NPM Script

#### Known CLI's / Commands

```bash
config-up jest --verbose --color
# Will run - jest --verbose --color --config where/the/config/was/found/jest-config.js
```

#### Custom Look-up / Unknown Commands

```bash
config-up --config-name=config --config-ext=js command --config $CONFIG_AT
# Will run - command --config where/the/config/was/found/jest-config.js

config-up --config-name=config --config-ext=js --config-ext=json command --config $config_up_config

# Will run - command --config where/the/config/was/found/jest-config.js
```