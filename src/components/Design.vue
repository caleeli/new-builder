<template>
  <b-card bg-variant="light" header="Design" class="rounded-0" header-class="p-0 text-center">
    <drop @drop="drop">
      <component :is="preview()" :owner="self"></component>
    </drop>
  </b-card>
</template>

<script>
import { Drop } from "vue-drag-drop";
import ObserveDomValue from "../mixins/ObserveDomValue";
import Selector from "./Selector";

export default {
  components: { Drop },
  mixins: [ObserveDomValue],
  props: {
    builder: {
      type: Object,
      required: true
    },
    value: null,
    variables: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      self: this,
      draggingNodeId: null,
      selectedNode: null,
      dragOverNode: null,
      dragContent: null,
      dropNodeId: null,
      dropZone: null
    };
  },
  methods: {
    getDraggingNodeId() {
      return this.draggingNodeId;
    },
    setDraggingNodeId(draggingNodeId) {
      this.draggingNodeId = draggingNodeId;
    },
    getDropNodeId() {
      return this.dropNodeId;
    },
    setDropNodeId(id) {
      this.dropNodeId = id;
    },
    getDragContent() {
      return this.dragContent;
    },
    setDragContent(node) {
      this.dragContent = node;
    },
    getDragOverNode() {
      return this.dragOverNode;
    },
    setDragOverNode(node) {
      this.dragOverNode = node;
    },
    getSelectedNode() {
      return this.selectedNode;
    },
    setSelectedNode(node) {
      this.selectedNode = node;
    },
    html() {
      const div = this.value.ownerDocument.createElement("div");
      const clone = this.value.cloneNode(true);
      const nodes = this.builder.getAllNodes(clone);
      nodes.forEach(node => {
        const drop = this.value.ownerDocument.createElement("selector");
        node.parentNode.insertBefore(drop, node);
        drop.appendChild(node);
        drop.setAttribute("v-bind:owner", "owner");
        drop.setAttribute("v-bind:is-dragged", JSON.stringify(node.getAttribute("builder-id")) + "==owner.draggingNodeId");
        if (this.dragContent) {
          let content = this.createDropZone(
            this.dragContent,
            node.getAttribute("builder-id"),
            "before"
          );
          drop.parentNode.insertBefore(content, drop);
          content = this.createDropZone(
            this.dragContent,
            node.getAttribute("builder-id"),
            "after"
          );
          drop.parentNode.insertBefore(content, drop.nextSibling);
          // slots
          const definition = this.builder.getDefinitionOf(node);
          if (definition.slots instanceof Array) {
            definition.slots.forEach(slot => this.createSlotDropZone(node, slot));
          }
        }
      });
      div.appendChild(clone);
      return div.innerHTML;
    },
    createSlotDropZone(node, slot = 'default') {
      if (slot === 'default') {
        const content = this.createDropZone(
          this.dragContent,
          node.getAttribute("builder-id"),
          "inside"
        );
        node.appendChild(content);
      } else {
        const id = node.getAttribute("builder-id");
        const zone = `slot:${slot}`;
        const content = this.createDropZone(this.dragContent, id, zone, true);
        const slotNode = this.value.ownerDocument.createElement("template");
        slotNode.setAttribute(
          "v-if",
          `owner.dropNodeId=="${id}" && owner.dropZone=="${zone}"`
        );
        slotNode.setAttribute("v-slot:" + slot, "");
        slotNode.innerHTML = content;
        node.appendChild(slotNode);
      }
    },
    createDropZone(content, id, zone, asString = false) {
      const div = this.value.ownerDocument.createElement("div");
      div.innerHTML = content;
      div.firstElementChild.setAttribute(
        "v-if",
        `owner.dropNodeId=="${id}" && owner.dropZone=="${zone}"`
      );
      div.firstElementChild.setAttribute(
        "class",
        div.firstElementChild.getAttribute("class") + " drop-zone"
      );
      return asString ? div.innerHTML : div.firstElementChild;
    },
    testComponent(component) {
      const Vue = this.$root.constructor;
      const warnHandler = Vue.config.warnHandler;
      const errorHandler = Vue.config.errorHandler;
      try {
        const errors = [];
        Vue.config.warnHandler = err => {
          errors.push(err);
        };
        Vue.config.errorHandler = err => {
          errors.push(err);
        };
        // Test component
        const TestComponent = Vue.component("designview", component);
        const instance = new TestComponent({
          propsData: {
            owner: this
          }
        });
        instance.$mount();
        if (errors.length > 0) {
          throw errors.join("\n");
        }
        Vue.config.warnHandler = warnHandler;
        Vue.config.errorHandler = errorHandler;
        return TestComponent;
      } catch (e) {
        Vue.config.warnHandler = warnHandler;
        Vue.config.errorHandler = errorHandler;
        throw e;
      }
    },
    preview() {
      try {
        const variables = {};
        this.variables.forEach(v => variables[v.name] = v.value);
        const component = {
          components: { Selector },
          props: {
            owner: null
          },
          methods: {},
          data() {
            return variables;
          }
        };
        component.template = this.html();
        // Test component
        this.testComponent(component);
        return component;
      } catch (e) {
        return {
          template: '<h4 class="text-danger">' + e + "</h4>"
        };
      }
    },
    drop(component) {
      if (!component.drop) {
        return;
      }
      if (this.dragOverNode) {
        component.drop(this.builder.getNode(this.dragOverNode), this.dropZone);
      } else {
        component.drop(this.value, "inside");
      }
      this.setDragContent(null);
      this.setDragOverNode(null);
      this.setDropNodeId(null);
    }
  },
  watch: {
    selectedNode(selectedNode) {
      this.$emit("node-selected", this.builder.getNode(selectedNode));
    }
  }
};
</script>

<style>
.selector-opacity {
  opacity: 0.3;
  border: 1px solid red;
}
.drop-zone {
  opacity: 0.5;
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-iteration-count: infinite;
}
@keyframes fadeIn {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.3;
  }
}
</style>