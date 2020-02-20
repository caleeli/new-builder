<template>
  <b-card bg-variant="light" header="Components" class="text-center">
    <component v-for="node in components" :is="node" :key="node" :owner="self" />
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
    }
  }
};
</script>

<style>
</style>