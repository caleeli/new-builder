<template>
  <component :is="nodeName" v-bind="attributes">
    <template v-for="(child,index) in children">
      <template v-if="isComponent(child)">
        <drop-zone :key="`drop-before-${index}`" :node="child" zone="before" v-html="preview" />
        <node-editor :key="`node-${index}`"
          :value="child"
        />
        <drop-zone :key="`drop-after-${index}`" :node="child" zone="after" v-html="preview" />
      </template>
      <template v-else>
        <component :is="child.nodeName" :key="`node-${index}`" v-bind="child.attributes" />
      </template>
    </template>
  </component>
</template>

<script>
export default {
  props: {
    value: null,
  },
  computed: {
    nodeName() {
      return this.value.nodeName;
    },
    attributes() {
      return this.value.attributes;
    },
  },
}
</script>

<style>

</style>