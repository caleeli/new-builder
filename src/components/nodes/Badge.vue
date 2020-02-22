<script>
import BaseNode from "../BaseNode";
import Html from "../types/Html";

export default {
  extends: BaseNode,
  data() {
    return {
      tag: 'b-badge',
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
