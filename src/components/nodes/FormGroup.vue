<script>
import BaseNode from "../BaseNode";

export default {
  extends: BaseNode,
  data() {
    return {
      tag: "B-FORM-GROUP",
      icon: "square",
      name: "Input Row",
      template: `<b-form-group
      description="Let us know your name."
      label="Enter your name"
    >
      <b-form-input builder-id v-model="text" trim></b-form-input>
    </b-form-group>`,
      preview: `<b-form-group
      description="Let us know your name."
      label="Enter your name"
    >
      <b-form-input v-model="text" trim></b-form-input>
    </b-form-group>`,
      props: {
        label: {
          type: String,
          label: "Label",
          description: "",
        },
        description: {
          type: String,
          label: "Description",
          description: "",
        },
      },
      slots: {
      }
    };
  },
  methods: {
    oncreate() {
      
    }
  },
};
</script>
