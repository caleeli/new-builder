<template>
  <b-form-group
    :label="label"
    :label-for="`inspector-${name}`"
    :description="description"
    label-cols="4"
    class="border-bottom m-0 p-1"
    append="V"
  >
    <b-input-group size="sm">
      <b-form-textarea
        :id="`inspector-${name}`"
        v-model="local"
        size="sm"
        type="text"
        :placeholder="placeholder"
        :minMatchingChars="1"
      />
    </b-input-group>
  </b-form-group>
</template>

<script>
import Type from "../../mixins/Type";

export default {
  mixins: [Type],
  props: {
    description: String,
    placeholder: String,
  },
  computed: {
    local: {
      get() {
        return this.node.innerHTML;
      },
      set(value) {
        this.node.innerHTML = value;
      },
    },
  },
};
</script>
