<script>
import BaseNode from "../BaseNode";
import Html from "../types/Html";

export default {
  extends: BaseNode,
  data() {
    return {
      tag: "B-CARD",
      icon: "address-card",
      name: "Card",
      template: `<b-card :title='"Card Title"'></b-card>`,
      preview: `<div class="card"><div class="card-body"><h4 class="card-title">Card Title</h4>Content...</div></div>`,
      props: {
        title: {
          type: String,
          label: "Title",
          description: ""
        },
      },
      slots: {
        default: Html,
        dismiss: Html
      }
    };
  }
};
</script>
