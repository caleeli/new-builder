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
      preview: `<fieldset class="form-group"><legend class="bv-no-focus-ring col-form-label pt-0">Enter your name</legend><div role="group" class="bv-no-focus-ring"><input type="text" class="form-control" ></div><small class="form-text text-muted">Let us know your name.</small></div></fieldset>`,
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
