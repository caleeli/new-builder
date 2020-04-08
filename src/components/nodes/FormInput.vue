<script>
import BaseNode from "../BaseNode";

export default {
  extends: BaseNode,
  data() {
    return {
      tag: "B-FORM-INPUT",
      icon: "square",
      name: "Input",
      template: `<b-form-input type='text' v-model="firstname"></b-form-input>`,
      preview: `<input class="form-control">`,
      props: {
        type: {
          type: String,
          label: "Type",
          description: "",
        },
        'v-model': {
          type: String,
          component: 'Variable',
          label: "Variable",
          description: "",
        },
      },
      slots: {
      }
    };
  },
  methods: {
    oncreate(node, {addVariable}) {
      addVariable('firstname', 'David');
    }
  }
};
</script>
