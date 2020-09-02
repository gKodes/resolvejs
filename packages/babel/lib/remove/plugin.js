export default function plugin(plugins, listToRemove) {
  listToRemove = (Array.isArray(listToRemove) && listToRemove) || [listToRemove];
  return plugins.filter((pluginName) => listToRemove.contains(listToRemove));
}
