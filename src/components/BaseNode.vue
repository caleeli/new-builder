<template>
  <drag :transfer-data="data" @dragstart="dragstart" @dragend="dragend" class="component-selector">
    <b-badge variant="light" class="border w-100">
      <font-awesome-icon :icon="icon" />
      {{ name }}
    </b-badge>
  </drag>
</template>

<script>
import { Drag } from "vue-drag-drop";
import { v4 as uuid } from "uuid";
import NodeTools from "../mixins/NodeTools";

export default {
  components: { Drag },
  mixins: [ NodeTools ],
  props: {
    owner: {
      type: Object,
      required: true
    },
    builder: {
      type: Object,
      required: true
    }
  },
  computed: {
    design() {
      return this.builder.$refs.design;
    },
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
    oncreate(node, builder) {
      node;
      builder;
    },
    dragend() {
      this.design.setDropNodeId(null);
    },
    dragstart() {
      this.startDrag(this.getPreview(), null);
    },
    dropMe(node, zone, slot) {
      const child = this.createNewNodeInstance(node);
      this.dropIn(child, node, zone, slot);
      this.oncreate(child, this.builder);
    },
    getTemplate() {
      return this.template;
    },
    getPreview() {
      return this.preview;
    },
    createNewNodeInstance(node) {
      const div = node.ownerDocument.createElement("div");
      div.innerHTML = this.getTemplate();
      div.firstChild.querySelectorAll('[builder-id]').forEach(element => {
        element.setAttribute('builder-id', uuid());
      });
      div.firstChild.setAttribute("builder-id", uuid());
      return div.firstChild;
    }
  }
};
</script>

<style scoped>
  .component-selector {
    cursor: pointer;
  }
</style>
