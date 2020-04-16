<template>
  <drag
    :transfer-data="self"
    @dragstart="dragstart"
    @drag="drag"
    @dragend="dragend"
    @drop="drop"
    class="component-selector"
    :class="{'is-dragged': isDragged}"
  >
    <drop @dragover="dragover" class="selector">
      <span
        ref="content"
        class="selector-content"
        :class="{selected: isSelected, hover: isHovered}"
        @click.stop="click"
      >
        <slot></slot>
      </span>
    </drop>
  </drag>
</template>

<script>
import Draggable from "../mixins/Draggable";
const jquery = require("jquery");

export default {
  mixins: [Draggable],
  props: {
    owner: {
      type: Object,
      required: true
    },
    isDragged: Boolean
  },
  data() {
    return {
      self: this,
      elementId: null,
      isBefore: false,
      isAfter: false
    };
  },
  computed: {
    element() {
      return this.owner.builder.getNode(this.elementId);
    },
    content() {
      return this.owner.dragContent;
    },
    isSelected() {
      const node = this.owner.getSelectedNode();
      return node === this.elementId;
    },
    isHovered() {
      const node = this.owner.dragOverNode;
      return node === this.elementId;
    }
  },
  methods: {
    dragend() {
      this.owner.builder.$refs.design.setDropNodeId(null);
      this.owner.setDraggingNodeId(null);
    },
    drag(obj, evn) {
      evn.stopPropagation();
      try  {
        this.owner.setDragContent(this.getPreview());
      } catch (e) {
        console.error(e);
      }
      this.owner.getDraggingNodeId() != this.elementId
        ? this.owner.setDraggingNodeId(this.elementId)
        : null;
    },
    dragstart(a, event) {
      event.stopPropagation();
    },
    drop(target, zone) {
      this.owner.setDraggingNodeId(null);
      this[`drop${zone.replace(/\w/, a => a.toUpperCase())}`](this.element, target);
    },
    getPreview() {
      return this.owner.builder.getDefinitionOf(this.element).getPreview();
    },
    click() {
      this.owner.setSelectedNode(this.elementId);
    },
    dragover(data, event) {
      const target = event.target || event.toElement || event.originalTarget;
      const owner = this.owner.builder.getOwnerNode(target, this.owner.draggingNodeId);
      const node = this.$refs.content.firstElementChild;
      if (!owner) {
        return;
      }
      // Exit if owner is a selectable child node
      if (owner !== node && node.contains(owner)) {
        console.log("exit ", owner, node);
        return;
      }
      this.owner.dropNodeId = this.elementId;
      const ownerOffset = jquery(node).offset();
      const targetOffset = jquery(owner).offset();
      const x = event.offsetX + targetOffset.left - ownerOffset.left;
      const y = event.offsetY + targetOffset.top - ownerOffset.top;
      const pos = {
        x: x,// / owner.offsetWidth,
        y: y,// / owner.offsetHeight
      };
      this.isBefore = pos.y < 16;
      this.isAfter = pos.y > (owner.offsetHeight - 16);
      this.owner.dropZone = "inside";
      this.isBefore ? (this.owner.dropZone = "before") : null;
      this.isAfter ? (this.owner.dropZone = "after") : null;
      if (this.owner.getDragOverNode() !== this.elementId) {
        this.owner.setDragOverNode(this.elementId);
      }
    }
  },
  mounted() {
    this.elementId = this.$refs.content.firstElementChild && this.$refs.content.firstElementChild.getAttribute(
      "builder-id"
    );
  }
};
</script>

<style scoped>
.selector {
  display: inline;
  cursor: pointer;
}
.selector .hover > * {
}
.dragged {
  -webkit-box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.2);
}
.is-dragged {
  opacity: 0.5;
}
.component-selector {
  display: inline;
  cursor: pointer;
}
</style>

<style>
.selector .selected > * {
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
  box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
}
</style>