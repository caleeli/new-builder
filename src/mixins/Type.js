import ObserveDomValue from './ObserveDomValue';

export default {
  mixins: [ObserveDomValue],
  props: {
    owner: {
      type: Object,
      required: true,
    },
    value: {
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    label: String,
    description: String,
  },
  computed: {
    local: {
      get() {
        return this.node.getAttribute(this.attributeName);
      },
      set(value) {
        this.node.setAttribute(this.attributeName, value);
      },
    },
    attributeName() {
      return (this.isComputed ? ':' : '') + this.name;
    },
    isComputed() {
      return this.node.hasAttribute(':' + this.name);
    }
  },
  methods: {
    switchComputed() {
      const value = this.local;
      const isComputed = this.isComputed;
      this.node.removeAttribute(this.attributeName);
      if (isComputed) {
        this.node.setAttribute(this.name, value);
      } else {
        this.node.setAttribute(':' + this.name, value);
      }
    }
  },
};
