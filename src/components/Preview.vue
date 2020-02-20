<template>
  <component :is="preview()"></component>
</template>

<script>
export default {
  props: {
    value: null
  },
  data() {
    return {};
  },
  methods: {
    javascript() {
      return "";
    },
    html() {
      const div = this.value.ownerDocument.createElement("div");
      div.appendChild(this.value);
      return div.innerHTML;
    },
    testComponent(component) {
      const Vue = this.$root.constructor;
      const warnHandler = Vue.config.warnHandler;
      const errorHandler = Vue.config.errorHandler;
      try {
        const errors = [];
        Vue.config.warnHandler = err => {
          errors.push(err);
        };
        Vue.config.errorHandler = err => {
          errors.push(err);
        };
        // Test component
        const TestComponent = Vue.component("preview", component);
        const instance = new TestComponent();
        instance.$mount();
        if (errors.length > 0) {
          throw errors.join("\n");
        }
        Vue.config.warnHandler = warnHandler;
        Vue.config.errorHandler = errorHandler;
        return TestComponent;
      } catch (e) {
        Vue.config.warnHandler = warnHandler;
        Vue.config.errorHandler = errorHandler;
        throw e;
      }
    },
    preview() {
      try {
        const component = new Function(
          (this.javascript() || 'return {data(){return {field:""}}}').replace(
            "export default ",
            "return "
          )
        )();
        component.template = this.html();
        // Test component
        this.testComponent(component);
        return component;
      } catch (e) {
        return {
          template: '<h3 class="text-danger">' + e + "</h3>"
        };
      }
    }
  }
};
</script>

<style>
</style>