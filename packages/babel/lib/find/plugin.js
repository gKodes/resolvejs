export default function plugin(plugins, name) {
  return plugins.find((pluginName) => pluginName === name);
}
