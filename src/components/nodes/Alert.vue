<script>
import BaseNode from "../BaseNode";
import Html from "../Html";

export default {
  extends: BaseNode,
  data() {
    return {
      icon: "square",
      name: "Alert",
      template: "<b-alert show>Default Alert</b-alert>",
      preview: `<div class="alert alert-info dragged">Default Alert</div>`,
      props: {
        
      },
      slots: {
        default: Html
      }
    };
  }
};
</script>
