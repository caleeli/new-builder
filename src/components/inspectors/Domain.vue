<template>
  <b-form-group
    :label="label"
    :label-for="`inspector-${name}`"
    :description="description"
    label-cols="4"
    class="border-bottom m-0 p-1"
  >
    <vue-bootstrap-typeahead
      :id="`inspector-${name}`"
      v-model="local"
      size="sm"
      type="text"
      :placeholder="placeholder"
      :data="data"
      :minMatchingChars="1"
      ref="input"
    ></vue-bootstrap-typeahead>
  </b-form-group>
</template>

<script>
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";
import Type from "../../mixins/Type";

export default {
  components: { VueBootstrapTypeahead },
  mixins: [Type],
  props: {
    value: String,
    description: String,
    placeholder: String,
    autocomplete: null
  },
  computed: {
    data() {
      return (
        (this.autocomplete instanceof Function
          ? this.autocomplete({
              property: this,
              inspector: this.owner,
              builder: this.owner.builder
            })
          : this.autocomplete) || []
      );
    }
  },
  mounted() {
    this.$refs.input.inputValue = this.local;
  },
};
</script>
