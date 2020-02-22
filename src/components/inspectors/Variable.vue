<template>
  <b-form-group
    :label="label"
    :label-for="`inspector-${name}`"
    :description="description"
    label-cols="4"
    class="border-bottom m-0 p-1"
  >
    <b-form-input :id="`inspector-${name}`" v-model="local" size="sm" type="text" :placeholder="placeholder"></b-form-input>
  </b-form-group>
</template>

<script>
import Type from "../../mixins/Type";

export default {
  mixins: [Type],
  props: {
    value: String,
    description: String,
    placeholder: String
  }
};
</script>
