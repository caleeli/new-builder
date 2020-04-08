<template>
  <b-form-group
    :label="label"
    :label-for="`inspector-${name}`"
    :description="description"
    label-cols="4"
    class="border-bottom m-0 p-1"
  >
    <b-input-group size="sm">
    <b-form-select v-model="local" :options="options" size="sm"></b-form-select>
      <b-input-group-append>
        <b-button variant="outline-info" @click="toggleConfigVariable">
          <font-awesome-icon icon="ellipsis-h" />
        </b-button>
      </b-input-group-append>
    </b-input-group>
    <template v-if="panel === 'list'">
      <div class="text-right">
        <a href="javascript:void(0)" class="button-small" @click="addVariable"><font-awesome-icon icon="plus" /></a>
      </div>
      <b-table class="table-small" striped hover small :items="variables" :fields="fields">
        <template v-slot:cell(actions)="row">
          <a class="ml-1" href="javascript:void(0)" @click="editVariable(row.item)">
            <font-awesome-icon icon="pen" />
          </a>
          <a class="ml-1" href="javascript:void(0)" @click="removeVariable(row.item)">
            <font-awesome-icon icon="trash" />
          </a>
        </template>
      </b-table>
    </template>
    <b-card v-if="panel === 'add'" body-class="p-0" bg-variant="light">
      <b-card-text class="p-2">
        <b-form-group
          label="Name"
          label-size="sm"
          class="mb-0"
        >
          <b-form-input v-model="varName" size="sm" />
        </b-form-group>
        <b-form-group
          label="Value"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group prepend="=" size="sm">
            <b-form-input v-model="varValue" size="sm" />
          </b-input-group>
        </b-form-group>
      </b-card-text>
      <b-card-footer class="text-right p-2">
        <b-btn-group>
          <b-button size="sm" class="button-small" variant="secondary" @click="panel='list'">CANCEL</b-button>
          <b-button size="sm" class="button-small" variant="primary" @click="doAdd">ADD</b-button>
        </b-btn-group>
      </b-card-footer>
    </b-card>
    <b-card v-if="panel === 'edit'" body-class="p-0" bg-variant="light">
      <b-card-text class="p-2">
        <b-form-group
          label="Name"
          label-size="sm"
          class="mb-0"
        >
          <b-form-input v-model="varName" size="sm" />
        </b-form-group>
        <b-form-group
          label="Value"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group prepend="=" size="sm">
            <b-form-input v-model="varValue" size="sm" />
          </b-input-group>
        </b-form-group>
      </b-card-text>
      <b-card-footer class="text-right p-2">
        <b-btn-group>
          <b-button size="sm" class="button-small" variant="secondary" @click="panel='list'">CANCEL</b-button>
          <b-button size="sm" class="button-small" variant="primary" @click="doUpdate">UPDATE</b-button>
        </b-btn-group>
      </b-card-footer>
    </b-card>
  </b-form-group>
</template>

<script>
import Type from "../../mixins/Type";

export default {
  mixins: [Type],
  computed: {
    options() {
      const options = [];
      this.builder.variables.forEach(v => options.push(v.name));
      return options;
    },
    variables() {
      return this.builder.variables;
    }
  },
  data() {
    return {
      varEdited: '',
      varName: '',
      varValue: '""',
      fields: ['name', 'value', {key: 'actions', label: '', tdClass: 'text-right'}],
      panel: '',
    };
  },
  methods: {
    doAdd() {
      this.builder.addVariable(this.varName, JSON.parse(this.varValue));
      this.panel = 'list';
    },
    doUpdate() {
      this.builder.updateVariable(this.varEdited, {
        name: this.varName,
        value: JSON.parse(this.varValue),
      });
      this.panel = 'list';
    },
    addVariable() {
      this.panel = 'add';
      this.varEdited = '';
      this.varName = '';
      this.varValue = JSON.stringify('');
    },
    editVariable(variable) {
      this.panel = 'edit';
      this.varEdited = variable.name;
      this.varName = variable.name;
      this.varValue = JSON.stringify(variable.value);
    },
    removeVariable() {
      this.panel = 'remove';
    },
    toggleConfigVariable() {
      this.panel = this.panel ? '' : 'list';
    }
  },
};
</script>

<style scoped>
.table-small{
  font-size: 0.75rem;
}
.button-small{
  font-size: 0.75rem;
}
</style>