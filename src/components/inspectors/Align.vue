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
      <b-button size="sm"
        v-for="variant in autocomplete"
        :key="`variant-${variant}`"
        :variant="local === variant ? 'secondary' : 'outline-secondary'"
        @click="local= local===variant ? '' : variant"
      >
      <font-awesome-icon
        :icon="`align-${variant}`"
      />
      </b-button>
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
        return ["left", "center", "right"];
      }
    },
  },
};
</script>
