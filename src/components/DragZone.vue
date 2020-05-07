<template>
  <drag
    :transfer-data="self"
    @dragstart="dragstart"
    @drag="drag"
    @dragend="dragend"
    class="component-selector"
    :class="{ isSelected }"
  >
    <slot></slot>
    <template slot="image">
      <div v-html="definition.getPreview()"></div>
    </template>
  </drag>
</template>

<script>
import NodeTools from '../mixins/NodeTools';

export default {
  mixins: [ NodeTools ],
  props: {
    node: {
      type: null,
      required: true,
    },
    definition: {
      type: null,
      required: true,
    },
    design: {
      type: Object,
      required: true,
    },
    builder: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      self: this,
    };
  },
  computed: {
    isSelected() {
      return this.builder.selectedNode === this.node;
    },
    elementId() {
      return this.node.getAttribute('builder-id');
    },
  },
  methods: {
    dragstart(a, event) {
      event.stopPropagation();
      this.$nextTick(() => {
        this.startDrag(this.definition.getPreview(), this.node);
      });
    },
    dragend() {
      this.design.dragContent = null;
      this.design.dragOver = null;
    },
    dropMe(node, zone, slot) {
      this.dropIn(this.node, node, zone, slot);
    },
    drag() {
      //console.log(e);
    },
  },
}
</script>

<style>
.isSelected > * {
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
}
</style>