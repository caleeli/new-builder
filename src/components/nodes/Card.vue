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
        "align": {
          "type": String,
          "label": "align",
          "description": "Text alignment for the card's content: 'left', 'center' or 'right'",
          "autocomplete": [
            "left",
            "center",
            "rigth"
          ]
        },
        "bg-variant": {
          "type": String,
          "label": "bg-variant",
          "description": "Applies one of the Bootstrap theme color variants to the background",
          "component": "Variant"
        },
        "body-bg-variant": {
          "type": String,
          "label": "body-bg-variant",
          "description": "Applies one of the Bootstrap theme color variants to the body background",
          "component": "Variant"
        },
        "body-border-variant": {
          "type": String,
          "label": "body-border-variant",
          "description": "Applies one of the Bootstrap theme color variants to the body border",
          "component": "Variant"
        },
        "body-class": {
          "type": String,
          "label": "body-class",
          "description": "CSS class (or classes) to apply to the body"
        },
        "body-tag": {
          "type": String,
          "label": "body-tag",
          "description": "Specify the HTML tag to render instead of the default tag for the body"
        },
        "body-text-variant": {
          "type": String,
          "label": "body-text-variant",
          "description": "Applies one of the Bootstrap theme color variants to the body text",
          "component": "Variant"
        },
        "border-variant": {
          "type": String,
          "label": "border-variant",
          "description": "Applies one of the Bootstrap theme color variants to the border",
          "component": "Variant"
        },
        "footer": {
          "type": String,
          "label": "footer",
          "description": "Text content to place in the footer"
        },
        "footer-bg-variant": {
          "type": String,
          "label": "footer-bg-variant",
          "description": "Applies one of the Bootstrap theme color variants to the footer background",
          "component": "Variant"
        },
        "footer-border-variant": {
          "type": String,
          "label": "footer-border-variant",
          "description": "Applies one of the Bootstrap theme color variants to the footer border",
          "component": "Variant"
        },
        "footer-class": {
          "type": String,
          "label": "footer-class",
          "description": "CSS class (or classes) to apply to the footer"
        },
        "footer-html": {
          "type": String,
          "label": "footer-html",
          "description": "HTML string content to place in the footer. Use with caution"
        },
        "footer-tag": {
          "type": String,
          "label": "footer-tag",
          "description": "Specify the HTML tag to render instead of the default tag for the footer"
        },
        "footer-text-variant": {
          "type": String,
          "label": "footer-text-variant",
          "description": "Applies one of the Bootstrap theme color variants to the footer text",
          "component": "Variant"
        },
        "header": {
          "type": String,
          "label": "header",
          "description": "Text content to place in the header"
        },
        "header-bg-variant": {
          "type": String,
          "label": "header-bg-variant",
          "description": "Applies one of the Bootstrap theme color variants to the header background",
          "component": "Variant"
        },
        "header-border-variant": {
          "type": String,
          "label": "header-border-variant",
          "description": "Applies one of the Bootstrap theme color variants to the header border",
          "component": "Variant"
        },
        "header-class": {
          "type": String,
          "label": "header-class",
          "description": "CSS class (or classes) to apply to the header"
        },
        "header-html": {
          "type": String,
          "label": "header-html",
          "description": "HTML string content to place in the header. Use with caution"
        },
        "header-tag": {
          "type": String,
          "label": "header-tag",
          "description": "Specify the HTML tag to render instead of the default tag for the header"
        },
        "header-text-variant": {
          "type": String,
          "label": "header-text-variant",
          "description": "Applies one of the Bootstrap theme color variants to the header text",
          "component": "Variant"
        },
        "img-alt": {
          "type": String,
          "label": "img-alt",
          "description": "Value to set the image attribute 'alt'"
        },
        "img-bottom": {
          "type": Boolean,
          "label": "img-bottom",
          "description": "Set if the image should appear at the bottom of the card"
        },
        "img-end": {
          "type": Boolean,
          "label": "img-end",
          "description": "Set if the image should appear at the end (right) of the card"
        },
        "img-height": {
          "type": "Number or String",
          "label": "img-height",
          "description": "The value to set on the image's 'height' attribute"
        },
        "img-left": {
          "type": Boolean,
          "label": "img-left",
          "description": "Set if the image should appear at the start (left) of the card. Synonym for the 'left' prop"
        },
        "img-right": {
          "type": Boolean,
          "label": "img-right",
          "description": "Set if the image should appear at the end (right) of the card. Synonym for the 'right' prop"
        },
        "img-src": {
          "type": String,
          "label": "img-src",
          "description": "URL for the optional image"
        },
        "img-start": {
          "type": Boolean,
          "label": "img-start",
          "description": "Set if the image should appear at the start (left) of the card"
        },
        "img-top": {
          "type": Boolean,
          "label": "img-top",
          "description": "Set if the image should appear at the top of the card"
        },
        "img-width": {
          "type": "Number or String",
          "label": "img-width",
          "description": "The value to set on the image's 'width' attribute"
        },
        "no-body": {
          "type": Boolean,
          "label": "no-body",
          "description": "Disable rendering of the default inner card-body element"
        },
        "overlay": {
          "type": Boolean,
          "label": "overlay",
          "description": "When set, will overlay the card body on top of the image (if the card has an image)"
        },
        "sub-title": {
          "type": String,
          "label": "sub-title",
          "description": "Text content to place in the sub title"
        },
        "sub-title-tag": {
          "type": String,
          "label": "sub-title-tag",
          "description": "Specify the HTML tag to render instead of the default tag for the sub title"
        },
        "sub-title-text-variant": {
          "type": String,
          "label": "sub-title-text-variant",
          "description": "Applies one of the Bootstrap theme color variants to the sub title text",
          "component": "Variant"
        },
        "tag": {
          "type": String,
          "label": "tag",
          "description": "Specify the HTML tag to render instead of the default tag"
        },
        "text-variant": {
          "type": String,
          "label": "text-variant",
          "description": "Applies one of the Bootstrap theme color variants to the text",
          "component": "Variant"
        },
        "title": {
          "type": String,
          "label": "title",
          "description": "Text content to place in the title"
        },
        "title-tag": {
          "type": String,
          "label": "title-tag",
          "description": "Specify the HTML tag to render instead of the default tag for the title"
        }
      },
      slots: [
        'header',
        'default',
        //'footer'
      ]
    };
  }
};
</script>
