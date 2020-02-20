<template>
  <drag :transfer-data="data" @dragstart="dragstart">
    <b-badge variant="light">
      <b-icon :icon="icon"></b-icon>
      {{ name }}
    </b-badge>
  </drag>
</template>

<script>
import { Drag } from "vue-drag-drop";
import { v4 as uuid } from "uuid";

export default {
  components: { Drag },
  props: {
    owner: {
      type: Object,
      required: true
    }
  },
  computed: {
    data() {
      return this;
    }
  },
  data() {
    return {
      name: "default",
      icon: "diamond",
      template: "<div></div>",
      preview: "<div>[default]</div>"
    };
  },
  methods: {
    dragstart() {
      this.owner.builder.$refs.design.setDragContent(this.getPreview());
    },
    drop(node, zone) {
      const child = this.createElement(node);
      child.setAttribute("builder-id", uuid());
      this[`drop${zone.replace(/\w/, a => a.toUpperCase())}`](child, node);
    },
    dropBefore(child, node) {
      node.parentNode.insertBefore(child, node);
    },
    dropInside(child, node) {
      node.appendChild(child);
    },
    dropAfter(child, node) {
      node.parentNode.insertBefore(child, node.nextSibling);
    },
    getTemplate() {
      return this.template;
    },
    getPreview() {
      return this.preview;
    },
    createElement(node) {
      const div = node.ownerDocument.createElement("div");
      div.innerHTML = this.getTemplate();
      return div.firstChild;
    }
  }
};
</script>

<style>
</style>