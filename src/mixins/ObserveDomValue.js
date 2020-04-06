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
    bindToDomValue() {
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
    unbindToDomValue() {
      if (this.mutationObserver) {
        this.mutationObserver.disconnect();
      }
    },
  },
  mounted() {
    this.node = this.value;
    this.bindToDomValue();
  },
  destroyed() {
    this.unbindToDomValue();
  },
  watch: {
    value() {
      this.node = null;
      this.node = this.value;
      this.unbindToDomValue();
      this.bindToDomValue();
    }
  },
}
