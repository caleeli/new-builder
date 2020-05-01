<template>
  <drop v-if="!nodeIsDragged && !alreadyInZone"
    @dragover="dragover"
    @drop="drop"
    @dragleave="dragleave"
  >
    <slot></slot>
    <span :class="{ isHovered }" class="drop-zone" v-html="html()"></span>
  </drop>
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
    zone: {
      type: String,
      required: true,
    },
    slotName: {
      type: String,
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
  computed: {
    alreadyInZone() {
      if (!this.design.draggedNode) {
        return false;
      }
      return this.zone === 'before' && this.node.previousElementSibling === this.design.draggedNode
        || this.zone === 'after' && this.node.nextElementSibling === this.design.draggedNode
        || this.zone === 'inside' && this.design.draggedNode && this.isInside(this.design.draggedNode, this.slotName);
    },
    nodeIsDragged() {
      return this.design.draggedNode === this.node;
    },
    isHovered() {
      return this.design.dragOver === this;
    },
  },
  methods: {
    isInside(node, slotName) {
      let found;
      const slot = slotName === 'default' ? this.node : this.getSlot(this.node, slotName);
      if (slot) {
        slot.childNodes.forEach(child => found = found || child === node);
      }
      return found;
    },
    html() {
      return this.design.dragContent;
    },
    dragover(data, evn) {
      this.design.dragOver = this;
      evn.stopPropagation();
    },
    dragleave(data, evn) {
      this.design.dragOver = null;
      evn.stopPropagation();
    },
    drop(component, evn) {
      this.design.setDragContent(null);
      this.design.dragOver = null;
      evn.stopPropagation();

      if (!component.dropMe) {
        return;
      }
      component.dropMe(this.node, this.zone, this.slotName);
    },
  },
}
</script>

<style>
.drop-zone {
  opacity: 0.5;
}
.drop-zone.isHovered {
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
@keyframes fadeIn {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
