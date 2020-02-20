<template>
  <b-row class="h-100">
    <b-col cols="3" class="h-100">
      <components ref="components" class="h-100" :builder="self" />
    </b-col>
    <b-col class="h-100">
      <design ref="design" class="h-100" v-model="node" :builder="self" />
    </b-col>
    <b-col cols="3" class="h-100">
      <inspector ref="inspector" class="h-100" :builder="self" />
    </b-col>
  </b-row>
</template>

<script>
import Components from "./Components";
import Design from "./Design";
import Inspector from "./Inspector";
import { v4 as uuid } from "uuid";

export default {
  components: { Components, Design, Inspector },
  computed: {
    self() {
      return this;
    }
  },
  data() {
    const node = window.document.createElement("div");
    node.innerHTML = "hello world";
    return {
      node
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
    appendChild(parentId, component) {
      const node = (parentId && this.getNode(parentId)) || this.node;
      const child = component.createElement(node);
      child.setAttribute("builder-id", uuid());
      node.appendChild(child);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.builder {
  height: 100%;
}
</style>
