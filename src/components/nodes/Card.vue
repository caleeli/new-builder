<script>
import BaseNode from "../BaseNode";

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
      slots: [
        'header',
        'default',
        'footer'
      ]
    };
  }
};
</script>
