<template>
  <drag
    :transfer-data="self"
    @dragstart="dragstart"
    @dragend="dragend"
    class="component-selector"
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
  },
  data() {
    return {
      self: this,
    };
  },
  computed: {
    elementId() {
      return this.node.getAttribute('builder-id');
    },
  },
  methods: {
    dragstart(a, event) {
      event.stopPropagation();
      this.$nextTick(() => {
        this.design.setDragContent(this.definition.getPreview());
        this.design.draggedNode = this.node;
      });
    },
    dragend() {
      this.design.dragContent = null;
      this.design.dragOver = null;
    },
    dropMe(node, zone, slot) {
      this.dropIn(this.node, node, zone, slot);
    },
  },
}
</script>

<style>

</style>