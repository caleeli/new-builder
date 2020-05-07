export default {
  methods: {
    appendChild(node, child) {
      if (node.nodeName === 'TEMPLATE') {
        const div = node.ownerDocument.createElement('div');
        div.appendChild(child);
        node.innerHTML = node.innerHTML + div.innerHTML;
      } else {
        node.appendChild(child);
      }
      return child;
    },
    getSlot(node, slot) {
      let find;
      node.childNodes.forEach(child => child.getAttribute && child.getAttribute('slot') === slot ? find = child : null);
      return find;
    },
    getOrCreateSlot(node, slot) {
      const find = this.getSlot(node, slot);
      if (find) {
        return find;
      }
      const template = node.ownerDocument.createElement('templatee');
      template.setAttribute('slot', slot);
      return node.appendChild(template);
    },
    // drop utils
    dropIn(child, node, zone, slot) {
      this[`drop${zone.replace(/\w/, a => a.toUpperCase())}`](child, node, slot);
    },
    dropBefore(child, node) {
      node.parentNode.insertBefore(child, node);
    },
    dropInside(child, node, slot) {
      if (!slot || slot === 'default') {
        node.appendChild(child);
      } else {
        const place = this.getOrCreateSlot(node, slot);
        this.appendChild(place, child);
      }
    },
    dropAfter(child, node) {
      node.parentNode.insertBefore(child, node.nextSibling);
    },
    startDrag(preview, node) {
      this.design.setDragContent(preview);
      this.design.draggedNode = node;
      this.design.nearZone = null;
      this.$nextTick(() => {
        this.design.calculateDropZonePositions();
      });
    },
  },
}
