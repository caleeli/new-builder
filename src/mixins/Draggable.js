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
    dropInside(child, node, slot) {
      console.log(`entrooo ${slot}`);
      if (!slot || slot === 'default') {
        node.appendChild(child);
      } else {
        const place = this.getOrCreateSlotNode(node, slot);
        place.appendChild(child);
      }
    },
    dropAfter(child, node) {
      node.parentNode.insertBefore(child, node.nextSibling);
    },
    getOrCreateSlotNode(owner, slot) {
      let node = owner.querySelector(`[slot=${slot}]`);
      if (!node) {
        node = owner.ownerDocument.createElement('div');
        node.setAttribute('slot', slot);
        owner.appendChild(node);
      }
      return node;
    },
  }
};
