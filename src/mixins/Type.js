export default {
  props: {
    owner: {
      type: Object,
      required: true,
    },
    value: null,
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
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
