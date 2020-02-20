<script>
import BaseNode from "../BaseNode";
import Html from "../Html";

export default {
  extends: BaseNode,
  data() {
    return {
      name: "Badge",
      template: `<b-badge variant="primary">Primary</b-badge>`,
      preview: `<b-badge variant="primary">Primary</b-badge>`,
      props: {},
      slots: {
        default: Html
      }
    };
  }
};
</script>
