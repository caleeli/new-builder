/**
 * NodeTypes
 */
const components = {};
const com = require.context('./', true, /\.(vue)$/i);

com.keys().map(key => {
    const name = key.substr(2, key.length - 6);
    const definition = com(key);
    components[name] = definition.default ? definition.default : definition;
});

export default {
  install: function (Vue) {
      Object.keys(components).forEach((name) => {
          Vue.component(name, components[name]);
      });
  }
}
