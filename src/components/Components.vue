<template>
  <b-card bg-variant="light" header="Components" class="rounded-0" header-class="p-0 text-center" body-class="pt-1 pb-1">
    <component v-for="node in components" :is="node" :key="node" :owner="self" :builder="builder" />
  </b-card>
</template>

<script>
import nodes from "./nodes";

export default {
  components: { ...nodes },
  props: {
    builder: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      self: this
    };
  },
  computed: {
    components() {
      return Object.keys(nodes);
    },
    definitions() {
      const Vue = this.$root.constructor;
      return this.components.map(name => {
        const node = nodes[name];
        const cmp = Vue.extend(node);
        const ins = new cmp({props: {owner: this, builder: this.builder}});
        return ins;
      });
    }
  }
};
</script>

<style>
</style>