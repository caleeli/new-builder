export default {
  props: {
    owner: {
      type: Object,
      required: true
    }
  },
  methods: {
    dragend() {
      this.owner.builder.$refs.design.setDropNodeId(null);
    },
    dragstart() {
      this.owner.builder.$refs.design.setDragContent(this.getPreview());
    },
    dropBefore(child, node) {
      node.parentNode.insertBefore(child, node);
    },
    dropInside(child, node) {
      node.appendChild(child);
    },
    dropAfter(child, node) {
      console.log([child.innerHTML, node.innerHTML]);
      node.parentNode.insertBefore(child, node.nextSibling);
    }
  }
};
