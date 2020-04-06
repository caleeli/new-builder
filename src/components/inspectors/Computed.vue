<template>
  <b-form-group
    :label="label"
    :label-for="`inspector-${name}`"
    :description="description"
    label-cols="4"
    class="border-bottom m-0 p-1"
    append="V"
  >
    <b-input-group size="sm" prepend="=">
      <b-form-input
        :id="`inspector-${name}`"
        v-model="local"
        size="sm"
        type="text"
        :placeholder="placeholder"
        :data="data"
        :minMatchingChars="1"
      />
      <b-input-group-append>
        <b-button variant="outline-info" @click="switchComputed">ƒ()</b-button>
      </b-input-group-append>
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
