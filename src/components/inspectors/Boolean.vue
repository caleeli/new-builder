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
  >
    <b-form-checkbox v-model="local" class="mt-2">
      <b-button class="float-right" size="sm" variant="outline-info" @click="switchComputed">ƒ()</b-button>
    </b-form-checkbox>
  </b-form-group>
</template>

<script>
import Type from "../../mixins/Type";

export default {
  mixins: [Type],
};
</script>
