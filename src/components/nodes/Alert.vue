<script>
import BaseNode from "../BaseNode";
import Html from "../types/Html";
//import Variable from "../types/Variable";

export default {
  extends: BaseNode,
  data() {
    return {
      tag: "B-ALERT",
      icon: "bell",
      name: "Alert",
      template: "<b-alert show>Default Alert</b-alert>",
      preview: `<div class="alert alert-info dragged">Default Alert</div>`,
      props: {
        show: {
          type: Boolean,
          label: "Show",
          description: ""
        },
        variant: {
          type: String,
          label: "Variant",
          description: "",
          autocomplete: ["success", "primary", "danger", "warning", "info"]
        },
        dismissible: {
          type: Boolean,
          label: "Dismissible",
          description: ""
        },
        "dismiss-label": {
          type: String,
          label: "Dismissible label",
          description: ""
        },
        /*"v-model": {
          type: String,
          label: "Variable",
          description: "",
          autocomplete({builder}) {
            return builder.variables;
          }
        },*/
        fade: {
          type: Boolean,
          label: "Fade",
          description: ""
        }
      },
      slots: {
        default: Html,
        dismiss: Html
      }
    };
  }
};
</script>
