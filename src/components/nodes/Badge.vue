<script>
import BaseNode from "../BaseNode";
import Html from "../types/Html";

export default {
  extends: BaseNode,
  data() {
    return {
      tag: 'B-BADGE',
      name: "Badge",
      icon: "tag",
      template: `<b-badge variant="primary">Primary</b-badge>`,
      preview: `<b-badge variant="primary">Primary</b-badge>`,
      props: {
        variant: {
          type: String,
          label: "Variant",
          description: "",
          autocomplete: ["success", "primary", "danger", "warning", "info"]
        },
      },
      slots: {
        default: Html
      }
    };
  }
};
</script>
