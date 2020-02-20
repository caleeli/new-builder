<template>
  <div id="app">
    <Builder />
  </div>
</template>

<script>
import Builder from "./components/Builder.vue";

export default {
  name: "App",
  components: {
    Builder
  }
};
</script>

<style>
#app,
body,
html {
  height: 100%;
  overflow: hidden;
}
</style>
