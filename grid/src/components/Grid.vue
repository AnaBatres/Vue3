<template>
  <div>
    <button @click="addWidget">Añadir widget</button>
    <div class="grid-stack"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'; 
import { GridStack } from 'gridstack'; 
import "gridstack/dist/gridstack.min.css"; 
import "gridstack/dist/gridstack-extra.min.css"; 
import GridstackItem from "./GrisStackItem.vue"; 

export default defineComponent({
  name: "Grid", 
  components: {
    GridstackItem, 
  },
  props: {
    cellHeight: {
      type: String,
      default: "3.8rem", 
    },
    static: {
      type: Boolean,
      default: false, 
    },
    float: {
      type: Boolean,
      default: false, 
    },
  },
  data() {
    return {
      gridOptions: {
        resize: true, 
        cellHeight: this.cellHeight, 
        float: this.float, 
        staticGrid: this.static, 
      },
      grid: null,
      widget: null, 
    };
  },
  provide() {
    return {
      masterLayout: this, // Le da el componente padre a los hijos
    };
  },
  methods: {
    addWidget() {
      this.widget = {
        typewidget: "Tabla",
      };
    },
    loadGrid() {
      this.grid = GridStack.init(this.gridOptions, '.grid-stack');
    },
  },
  mounted() {
    this.loadGrid(); 
  }
});
</script>

<style>
</style>
