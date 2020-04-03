<template>
  <b-form-group
    :label="label"
    :label-for="`inspector-${name}`"
    :description="description"
    label-cols="4"
    class="border-bottom m-0 p-1"
  >
    <b-input
      :id="`inspector-${name}`"
      v-model="local"
      size="sm"
      type="text"
      :placeholder="placeholder"
      :data="data"
      :minMatchingChars="1"
      ref="input"
    ></b-input>
  </b-form-group>
</template>

<script>
import Type from "../../mixins/Type";

export default {
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
};
</script>
