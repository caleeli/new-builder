<script>
import BaseNode from "../BaseNode";

export default {
  extends: BaseNode,
  data() {
    return {
      tag: "B-COLUMNS",
      icon: "columns",
      name: "Columns",
      template: `<b-columns></b-columns>`,
      preview: `<div class="d-flex w-100"><div>Column</div><div>Column</div></div>`,
      props: {
        title: {
          type: String,
          label: "Title",
          description: ""
        },
        'body-class': {
          type: String,
        },
      },
      slots: [
        'default',
      ]
    };
  }
};
</script>
