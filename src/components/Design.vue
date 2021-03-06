<template>
  <b-card bg-variant="light" header="Design" class="rounded-0" header-class="p-0 text-center" body-class="design-body" @mousemove="mousemove">
    <drop-zone :node="node" zone="inside" :design="self" :builder="builder" class="w-100 h-100">
      <component :is="component()" :design="self" :builder="builder"></component>
    </drop-zone>
  </b-card>
</template>

<script>
import ObserveDomValue from "../mixins/ObserveDomValue";
import NodeTools from "../mixins/NodeTools";
import DragZone from "./DragZone";
import DropZone from "./DropZone";

export default {
  components: { DropZone },
  mixins: [ ObserveDomValue, NodeTools ],
  props: {
    value: null,
    builder: {
      type: Object,
      required: true
    },
    variables: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      self: this,
      selectedNode: null,
      dragContent: null,
      dragOver: null,
      draggedNode: null,
      nearZone: null,
      dropZonePositions: [],
      dragY: 0,
    };
  },
  methods: {
    calculateDropZonePositions() {
      this.dropZonePositions.splice(0);
      this.$el.getElementsByClassName('drop-zone').forEach(el => {
        const rect = el.getBoundingClientRect();
        let component = el.parentNode.__vue__;
        while(component && component.$options._componentTag !== 'drop-zone') {
          component = component.$parent;
        }
        if (component && component.$options._componentTag === 'drop-zone') {
          this.dropZonePositions.push({
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2,
            target: el,
            zone: component,
            id: component.getId(),
            tag: component && component.$vnode.tag,
          });
        }
      });
    },
    mousemove(event) {
      let minH, min = null;
      this.$el.getElementsByClassName('drop-zone').forEach(el => {
        const rect = el.getBoundingClientRect();
        const h = (rect.x - event.x) * (rect.x - event.x) + (rect.y - event.y) * (rect.y - event.y);
        if (!min || h < minH) {
          minH = h;
          min = el;
        }
      });
      //console.log(min, minH, {x: event.x, y: event.y});
    },
    getDragContent() {
      return this.dragContent;
    },
    setDragContent(node) {
      this.dragContent = node;
    },
    setDropNodeId(id) {
      this.dropNodeId = id;
    },
    ////
    componentDefinition() {
      try {
        const variables = {};
        this.variables.forEach(v => variables[v.name] = v.value);
        const component = {
          components: { DragZone, DropZone },
          props: {
            design: {
              type: null,
              required: true,
            },
            builder: {
              type: null,
              required: true,
            },
          },
          methods: {
            node(id) {
              return this.builder.getNode(id);
            },
            definition(id) {
              return this.builder.getDefinitionOf(this.builder.getNode(id));
            },
          },
          data() {
            return variables;
          },
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                pattern: '^\\w+\\s\\w+$'
              },
              firstname: {
                type: 'string',
                minLength: 5
              },
              age: {
                type: 'integer',
                default: 20,
                minimum: 18,
                maximum: 30
              }
            },
            required: ['firstname']
          }
        };
        component.template = this.template();
        return component;
      } catch (e) {
        return {
          template: '<h4 class="text-danger">' + e + "</h4>"
        };
      }
    },
    component() {
      const component = this.componentDefinition();
      const Vue = this.$root.constructor;
      const warnHandler = Vue.config.warnHandler;
      const errorHandler = Vue.config.errorHandler;
      try {
        const errors = [];
        Vue.config.warnHandler = err => {
          errors.push(err);
        };
        Vue.config.errorHandler = err => {
          errors.push(err);
        };
        const VueComponent = Vue.component("designview", component);
        const instance = new VueComponent({
          propsData: {
            design: this,
            builder: this.builder,
          }
        });
        instance.$mount();
        if (errors.length > 0) {
          throw errors.join("\n");
        }
        Vue.config.warnHandler = warnHandler;
        Vue.config.errorHandler = errorHandler;
        return VueComponent;
      } catch (e) {
        Vue.config.warnHandler = warnHandler;
        Vue.config.errorHandler = errorHandler;
        throw e;
        //return {
        //  template: '<h4 class="text-danger">' + e + "</h4>",
        //};
      }
    },
    replaceTag(node, from, to) {
      let nodes = node.getElementsByTagName(from);
      while(nodes.length) {
        nodes.forEach(e => {
          const attributes = {};
          e.attributes.forEach(a => attributes[a.nodeName] = a.nodeValue || '');
          const c = this.createElement(to, attributes);
          c.innerHTML = e.innerHTML;
          e.parentNode.insertBefore(c, e);
          e.parentNode.removeChild(e);
        });
        nodes = node.getElementsByTagName(from);
      }
      return node;
    },
    template() {
      const clone = this.node.cloneNode(true);
      const nodes = this.builder.getAllNodes(clone);
      nodes.forEach(node => this.encapsulate(node));
      const div = this.createElement("div");
      div.appendChild(clone);
      const res = this.replaceTag(div, 'templatee', 'template').innerHTML;
      return res;
    },
    createElement(nodeName, attributes = {}) {
      const node = this.value.ownerDocument.createElement(nodeName);
      for(let name in attributes) {
        node.setAttribute(name, attributes[name]);
      }
      return node;
    },
    append(node, child) {
      node.parentNode.insertBefore(child, node.nextSibling);
    },
    dropZone(node, zone, slot = '') {
      return this.createDragDropZone('drop-zone', node, {
        'v-if': 'design.dragContent',
        zone,
        'slot-name': slot
      });
    },
    createDragDropZone(type, node, config) {
      return this.createElement(type, {
        'v-bind:node': `node(${JSON.stringify(node.getAttribute('builder-id'))})`,
        'v-bind:design': 'design',
        'v-bind:builder': 'builder',
        ...config
      });
    },
    encapsulate(node) {
      const definition = this.builder.getDefinitionOf(node);
      this.prepend(node, this.dropZone(node, 'before'));
      if (definition.slots instanceof Array) {
        definition.slots.forEach(slot => this.slotZone(node, slot));
      }
      this.append(node, this.dropZone(node, 'after'));
      const dragZone = this.createDragDropZone('drag-zone', node, {
        'v-bind:definition': `definition(${JSON.stringify(node.getAttribute('builder-id'))})`,
      });
      node.parentNode.insertBefore(dragZone, node);
      dragZone.appendChild(node);
    },
    prepend(node, child) {
      node.parentNode.insertBefore(child, node);
    },
    slotZone(node, slotName) {
      const slot = slotName === 'default' ? node : this.getOrCreateSlot(node, slotName);
      this.appendChild(slot, this.dropZone(node, 'inside', slotName));
    },
  },
  watch: {
    selectedNode(selectedNode) {
      this.$emit('node-selected', selectedNode);
    },
  },
}
</script>

<style>
.design-body {
  overflow-y: auto;
}
</style>