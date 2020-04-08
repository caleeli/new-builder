<template>
  <div class="h-100 d-flex">
    <div cols="2" class="h-100 p-0 p-components">
      <components ref="components" class="h-100" :builder="self" />
    </div>
    <div class="h-100 p-0 flex-fill">
      <design ref="design" class="h-100" v-model="node" :variables="variables" :builder="self" @node-selected="nodeSelected" />
    </div>
    <div cols="3" class="h-100 p-0 p-inspector">
      <inspector ref="inspector" class="h-100" :builder="self" :selected="selectedNode" />
    </div>
  </div>
</template>

<script>
import Components from "./Components";
import Design from "./Design";
import Inspector from "./Inspector";
//import { v4 as uuid } from "uuid";

export default {
  components: { Components, Design, Inspector },
  data() {
    const node = window.document.createElement("div");
    node.innerHTML = "hello world";
    return {
      variables: [{name:'text', value: 'text'}],
      node,
      selectedNode: null,
      self: this
    };
  },
  methods: {
    getNode(id, root = this.node) {
      return root.ownerDocument.evaluate(
        `//*[@builder-id="${id}"]`,
        root,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
    },
    getAllNodes(root = this.node) {
      const all = [];
      const nodes = root.ownerDocument.evaluate(
        `//*[@builder-id]`,
        root,
        null,
        XPathResult.ANY_TYPE,
        null
      );
      let node;
      while (null != (node = nodes.iterateNext())) {
        all.push(node);
      }
      return all;
    },
    getOwnerNode(node) {
      let owner = node;
      while (
        owner &&
        !(owner.getAttribute ? owner.getAttribute("builder-id") : null)
      ) {
        owner = owner.parentNode;
      }
      return owner; //id ? this.getNode(id) : this.node;
    },
    addVariable(name, value) {
      if (!this.variables.find(v => v.name === name)) {
        this.variables.push({ name, value });
      }
    },
    updateVariable(name, properties) {
      const variable = this.variables.find(v => v.name === name);
      if (variable) {
        Object.assign(variable, properties);
      }
    },
    getDefinitionOf(node) {
      return this.$refs.components.definitions.find(def => def.tag === node.nodeName);
    },
    nodeSelected(selectedNode) {
      this.selectedNode = selectedNode;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.builder {
  height: 100%;
}
.p-components {
  min-width: 15%;
}
.p-inspector {
  min-width: 25%;
}
</style>
