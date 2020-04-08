<template>
  <b-card bg-variant="light" header="Inspector" body-class="p-0" class="rounded-0" header-class="p-0 text-center">
    <component
      v-for="property in properties"
      :is="property.component"
      :key="`property-${property.name}`"
      :owner="self"
      :builder="builder"
      v-bind="property"
      v-model="selected"
    >
      <template slot="computed">
        <computed
          :owner="self"
          :builder="builder"
          v-bind="property"
          v-model="selected"
        />
      </template>
    </component>
  </b-card>
</template>

<script>
import inspectors from "./inspectors";

export default {
  components: { ...inspectors },
  props: {
    builder: {
      type: Object,
      required: true
    },
    selected: {
      type: null,
      required: true
    }
  },
  data() {
    return {
      self: this
    };
  },
  computed: {
    properties() {
      const properties = [];
      if (this.selected) {
        const definition = this.builder.getDefinitionOf(this.selected);
        if (!definition) {
          return [
            {
              component: "Error",
              message: "Can not find definition for " + this.selected.nodeName
            }
          ];
        }
        return Object.keys(definition.props).map(name => {
          const def = definition.props[name];
          return {
            name,
            label: name,
            component: def.component || def.type.name,
            ...def
          };
        });
      }
      return properties;
    }
  }
};
</script>

<style>
</style>