<script>
import BaseNode from "../BaseNode";

export default {
  extends: BaseNode,
  data() {
    return {
      tag: "B-FORM-INPUT",
      icon: "square",
      name: "Input",
      template: `<b-form-input type='text' v-model="firstname"></b-form-input>`,
      preview: `<input class="form-control">`,
      props: {
        "aria-invalid": {
          "type": String,
          "label": "aria-invalid",
          "description": "Sets the 'aria-invalid' attribute with the specified value"
        },
        "autocomplete": {
          "type": String,
          "label": "autocomplete",
          "description": "Sets the 'autocomplete' attribute value on the form control"
        },
        "autofocus": {
          "type": Boolean,
          "label": "autofocus",
          "description": "When set to 'true', attempts to auto-focus the control when it is mounted, or re-activated when in a keep-alive. Does not set the 'autofocus' attribute on the control"
        },
        "debounce": {
          "type": String,
          "label": "debounce",
          "description": "When set to a number of milliseconds greater than zero, will debounce the user input. Has no effect if prop 'lazy' is set"
        },
        "disabled": {
          "type": Boolean,
          "label": "disabled",
          "description": "When set to 'true', disables the component's functionality and places it in a disabled state"
        },
        "form": {
          "type": String,
          "label": "form",
          "description": "ID of the form that the form control belongs to. Sets the 'form' attribute on the control"
        },
        "formatter": {
          "type": Function,
          "label": "formatter",
          "description": "reference to a function for formatting the input"
        },
        "id": {
          "type": String,
          "label": "id",
          "description": "Used to set the 'id' attribute on the rendered content, and used as the base to generate any additional element IDs as needed"
        },
        "lazy": {
          "type": Boolean,
          "label": "lazy",
          "description": "When set, updates the v-model on 'change'/'blur' events instead of 'input'. Emulates the Vue '.lazy' v-model modifier"
        },
        "lazy-formatter": {
          "type": Boolean,
          "label": "lazy-formatter",
          "description": "When set, the input is formatted on blur instead of each keystroke (if there is a formatter specified)"
        },
        "list": {
          "type": String,
          "label": "list",
          "description": "The ID of the associated datalist element or component"
        },
        "max": {
          "type": "String or Number",
          "label": "max",
          "description": "Value to set in the 'max' attribute on the input. Used by number-like inputs"
        },
        "min": {
          "type": "String or Number",
          "label": "min",
          "description": "Value to set in the 'min' attribute on the input. Used by number-like inputs"
        },
        "name": {
          "type": String,
          "label": "name",
          "description": "Sets the value of the 'name' attribute on the form control"
        },
        "no-wheel": {
          "type": Boolean,
          "label": "no-wheel",
          "description": "For number-like inputs, disables the mouse wheel from incrementing or decrementing the value"
        },
        "number": {
          "type": Boolean,
          "label": "number",
          "description": "When set attempts to convert the input value to a native number. Emulates the Vue '.number' v-model modifier"
        },
        "placeholder": {
          "type": String,
          "label": "placeholder",
          "description": "Sets the 'placeholder' attribute value on the form control"
        },
        "plaintext": {
          "type": Boolean,
          "label": "plaintext",
          "description": "Set the form control as readonly and renders the control to look like plain text (no borders)"
        },
        "readonly": {
          "type": Boolean,
          "label": "readonly",
          "description": "Sets the 'readonly' attribute on the form control"
        },
        "required": {
          "type": Boolean,
          "label": "required",
          "description": "Adds the 'required' attribute to the form control"
        },
        "size": {
          "type": String,
          "label": "size",
          "description": "Set the size of the component's appearance. 'sm', 'md' (default), or 'lg'"
        },
        "state": {
          "type": Boolean,
          "label": "state",
          "description": "Controls the validation state appearance of the component. 'true' for valid, 'false' for invalid', or 'null' for no validation state"
        },
        "step": {
          "type": "String or Number",
          "label": "step",
          "description": "Value to set in the 'step' attribute on the input. Used by number-like inputs"
        },
        "trim": {
          "type": Boolean,
          "label": "trim",
          "description": "When set, trims any leading and trailing white space from the input value. Emulates the Vue '.trim' v-model modifier"
        },
        "type": {
          "type": String,
          "label": "type",
          "description": "The type of input to render. See the docs for supported types"
        },
        "v-model": {
          "type": "String or Number",
          "label": "value",
          "description": "The current value of the input.  Result will always be a string, except when the 'number' prop is used",
          "component": "Variable"
        }
      },
      slots: {
      }
    };
  },
  methods: {
    oncreate(node, {addVariable}) {
      addVariable('firstname', 'David');
    }
  }
};
</script>
