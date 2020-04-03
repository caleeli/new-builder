export default {
  data() {
    return {
      node: this.value,
    };
  },
  methods: {
    valueChanged() {
      this.node = null;
      this.node = this.value;
      this.$forceUpdate();
    },
  },
  mounted() {
    this.node = this.value;
    if (!this.value) {
      return;
    }
    this.mutationObserver = new MutationObserver((mutations) => {
      const attributes = mutations.find(mutation => mutation.type === 'attributes');
      const childList = mutations.find(mutation => mutation.type === 'childList');
      const subtree = mutations.find(mutation => mutation.type === 'subtree');
      if (attributes || childList || subtree) this.valueChanged();
    });
    this.mutationObserver.disconnect();
    this.mutationObserver.observe(this.value, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  },
  destroyed() {
    this.mutationObserver.disconnect();
  }
}
