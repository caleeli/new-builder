<template>
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
</template>

<script>
const jquery = require("jquery");

export default {
  props: {
    owner: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      elementId: null,
      isBefore: false,
      isAfter: false
    };
  },
  computed: {
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
    click() {
      this.owner.setSelectedNode(this.elementId);
    },
    dragover(data, event) {
      event.cancelBubble = true;
      const owner = this.owner.builder.getOwnerNode(event.toElement);
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
      const targetOffset = jquery(event.toElement).offset();
      const x = event.offsetX + targetOffset.left - ownerOffset.left;
      const y = event.offsetY + targetOffset.top - ownerOffset.top;
      const pos = {
        x: x / owner.offsetWidth,
        y: y / owner.offsetHeight
      };
      this.isBefore = pos.y < 0.2;
      this.isAfter = pos.y > 0.8;
      this.owner.dropZone = "inside";
      this.isBefore ? (this.owner.dropZone = "before") : null;
      this.isAfter ? (this.owner.dropZone = "after") : null;
      if (this.owner.getDragOverNode() !== this.elementId) {
        this.owner.setDragOverNode(this.elementId);
      }
    }
  },
  mounted() {
    this.elementId = this.$refs.content.firstElementChild.getAttribute(
      "builder-id"
    );
  }
};
</script>

<style>
.selector {
  display: inline;
}
.selector .selected > * {
  border: 1px dashed black;
}
.selector .hover > * {
}
.dragged {
  -webkit-box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.2);
}
</style>