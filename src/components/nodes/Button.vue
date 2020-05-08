<script>
import BaseNode from "../BaseNode";

export default {
  extends: BaseNode,
  data() {
    return {
      tag: "B-BUTTON",
      icon: "share-square",
      name: "Button",
      template: "<b-button variant='primary'>Button</b-button>",
      preview: `<div class="btn btn-primary">Button</div>`,
      props: {
        "active": {
          "type": Boolean,
          "label": "active",
          "description": "When set to 'true', places the component in the active state with active styling"
        },
        "active-class": {
          "type": String,
          "label": "active-class",
          "description": "router-link prop: Configure the active CSS class applied when the link is active. Typically you will want to set this to class name 'active'"
        },
        "append": {
          "type": Boolean,
          "label": "append",
          "description": "router-link prop: Setting append prop always appends the relative path to the current path"
        },
        "block": {
          "type": Boolean,
          "label": "block",
          "description": "Renders a 100% width button (expands to the width of its parent container)"
        },
        "disabled": {
          "type": Boolean,
          "label": "disabled",
          "description": "When set to 'true', disables the component's functionality and places it in a disabled state"
        },
        "event": {
          "type": "String or Array",
          "label": "event",
          "description": "router-link prop: Specify the event that triggers the link. In most cases you should leave this as the default"
        },
        "exact": {
          "type": Boolean,
          "label": "exact",
          "description": "router-link prop: The default active class matching behavior is inclusive match. Setting this prop forces the mode to exactly match the route"
        },
        "exact-active-class": {
          "type": String,
          "label": "exact-active-class",
          "description": "router-link prop: Configure the active CSS class applied when the link is active with exact match. Typically you will want to set this to class name 'active'"
        },
        "href": {
          "type": String,
          "label": "href",
          "description": "Denotes the target URL of the link for standard a links"
        },
        "no-prefetch": {
          "type": Boolean,
          "label": "no-prefetch",
          "description": "nuxt-link prop: To improve the responsiveness of your Nuxt.js applications, when the link will be displayed within the viewport, Nuxt.js will automatically prefetch the code splitted page. Setting 'no-prefetch' will disabled this feature for the specific link"
        },
        "pill": {
          "type": Boolean,
          "label": "pill",
          "description": "Renders the button with the pill style appearance when set to 'true'"
        },
        "pressed": {
          "type": Boolean,
          "label": "pressed",
          "description": "When set to 'true', gives the button the appearance of being pressed and adds attribute 'aria-pressed=\"true\"'. When set to `false` adds attribute 'aria-pressed=\"false\"'. Tri-state prop. Syncable with the .sync modifier"
        },
        "rel": {
          "type": String,
          "label": "rel",
          "description": "Sets the 'rel' attribute on the rendered link"
        },
        "replace": {
          "type": Boolean,
          "label": "replace",
          "description": "router-link prop: Setting the replace prop will call 'router.replace()' instead of 'router.push()' when clicked, so the navigation will not leave a history record"
        },
        "router-tag": {
          "type": String,
          "label": "router-tag",
          "description": "router-link prop: Specify which tag to render, and it will still listen to click events for navigation. 'router-tag' translates to the tag prop on the final rendered router-link. Typically you should use the default value"
        },
        "size": {
          "type": String,
          "label": "size",
          "description": "Set the size of the component's appearance. 'sm', 'md' (default), or 'lg'"
        },
        "squared": {
          "type": Boolean,
          "label": "squared",
          "description": "Renders the button with non-rounded corners when set to 'true'"
        },
        "tag": {
          "type": String,
          "label": "tag",
          "description": "Specify the HTML tag to render instead of the default tag"
        },
        "target": {
          "type": String,
          "label": "target",
          "description": "Sets the 'target' attribute on the rendered link"
        },
        "to": {
          "type": "String or Object",
          "label": "to",
          "description": "router-link prop: Denotes the target route of the link. When clicked, the value of the to prop will be passed to router.push() internally, so the value can be either a string or a Location descriptor object"
        },
        "type": {
          "type": String,
          "label": "type",
          "description": "The value to set the button's 'type' attribute to. Can be one of 'button', 'submit', or 'reset'"
        },
        "variant": {
          "type": String,
          "label": "variant",
          "description": "Applies one of the Bootstrap theme color variants to the component",
          "component": "Variant"
        }
      },
      slots: []
    };
  }
};
</script>
