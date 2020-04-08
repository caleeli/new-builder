<template>
  <div v-if="isComputed">
    <slot name="computed"></slot>
  </div>
  <b-form-group
    v-else
    :label="label"
    :label-for="`inspector-${name}`"
    :description="description"
    label-cols="4"
    class="border-bottom m-0 p-1"
    append="V"
  >
    <b-input-group size="sm">
      <font-awesome-icon
        v-for="variant in autocomplete"
        :key="`variant-${variant}`"
        :icon="local === variant ? 'check-circle' : 'circle'"
        :class="`text-${variant} mt-2 mr-1`"
        @click="local=variant"
      />
      <b-button variant="outline-info" size="sm" @click="switchComputed">ƒ()</b-button>
    </b-input-group>
  </b-form-group>
</template>

<script>
import Type from "../../mixins/Type";

export default {
  mixins: [Type],
  props: {
    autocomplete: {
      type: Array,
      default() {
        return ["success", "primary", "danger", "warning", "info"];
      }
    },
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
