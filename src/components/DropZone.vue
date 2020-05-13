<template>
  <drop v-show="!nodeIsDragged && !alreadyInZone"
    @dragover="dragover"
    @drop="drop"
    @dragleave="dragleave"
  >
    <slot></slot>
    <span :class="{ isHovered, notNear, isNear }" class="drop-zone" v-html="html()" :zone="zone"></span>
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
    isNear() {
      return this.design.nearZone && (this.design.nearZone.id === this.getId());
    },
    notNear() {
      return !this.design.nearZone || (this.design.nearZone.id !== this.getId());
    },
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
    getId() {
      return `${this.node.getAttribute('builder-id')}-${this.zone}-${this.slotName}`;
    },
    click() {
      this.design.selectedNode = this.node;
    },
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
    getPosition(el) {
      var _x = 0;
      var _y = 0;
      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }
      return { top: _y, left: _x };
    },
    dragover(data, evn) {
      this.design.dragOver = this;
      evn.stopPropagation();
      let minH, min = null, y = evn.y - 20 + this.design.$el.childNodes[2].scrollTop, x = evn.x;
      this.design.dragY = y;
      this.design.dropZonePositions.forEach(rect => {
        const h = (rect.y - y) * (rect.y - y) + (rect.x - x) * (rect.x - x);
        if (!min || h < minH) {
          minH = h;
          min = rect;
        }
      });
      if (min) {
        this.design.nearZone = min;
      }
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
  mounted() {
    this.$el.addEventListener('click', (event) => {
      const owner = this.builder.getOwnerNode(event.target);
      this.design.selectedNode = this.builder.getNode(owner.getAttribute('builder-id'));
      event.stopPropagation();
    });
  },
}
</script>

<style>
.drop-zone {
  opacity: 0.3;
}
.drop-zone.notNear > * {
  height: 4px;
  max-height: 4px;
  opacity: 0;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
}
.drop-zone.isNear > * {
  border: 1px solid red;
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
