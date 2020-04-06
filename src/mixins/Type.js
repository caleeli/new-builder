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
    type: null,
  },
  computed: {
    local: {
      get() {
        if (this.isComputed) {
          return this.node.getAttribute(this.attributeName);
        }
        return this.getAttributeByValue(this.attributeName);
      },
      set(value) {
        if (this.isComputed) {
          return this.node.setAttribute(this.attributeName, value);
        }
        this.setAttributeByValue(this.attributeName, value);
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
    getAttributeByValue(attributeName) {
      if (this.type === Boolean) {
        return this.node.hasAttribute(attributeName);
      }
      return this.node.getAttribute(attributeName);
    },
    setAttributeByValue(attributeName, value) {
      if (this.type === Boolean) {
        if (value) {
          this.node.setAttribute(attributeName, '');
        } else {
          this.node.removeAttribute(attributeName);
        }
        return;
      }
      this.node.setAttribute(attributeName, value);
    },
    switchComputed() {
      const value = this.local;
      const isComputed = this.isComputed;
      this.node.removeAttribute(this.attributeName);
      if (isComputed) {
        let parsed;
        try {
          parsed = JSON.parse(value);
        } catch(e) {
          parsed = value;
        }
        this.setAttributeByValue(this.name, parsed);
      } else {
        this.node.setAttribute(':' + this.name, JSON.stringify(value));
      }
    }
  },
};
