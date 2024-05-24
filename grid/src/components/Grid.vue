<script>
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { createApp } from 'vue';
import Tabla from './tabla.vue';

export default {
  data() {
    return {
      grid: null,
    };
  },
  methods: {
    inicializarGrid() {
      this.grid = GridStack.init({ float: true });
    },
    addWidget() {
      const w = 8;
      const h = 5;
      
      const gridStackItem = document.createElement('div');
      gridStackItem.className = "grid-stack-item";
      
      const gridStackItemContent = document.createElement('div');
      gridStackItemContent.className = "grid-stack-item-content";

      gridStackItem.appendChild(gridStackItemContent);

      const app = createApp(Tabla);
      app.mount(gridStackItemContent);

      this.grid.addWidget(gridStackItem, { w, h });
    },
    eliminarWidget() {
      const widget = this.grid.getGridItems().pop();
      this.grid.removeWidget(widget);
      console.log("widget --> ", widget);
    }
  },
  mounted() {
    this.inicializarGrid();
  }
};
</script>
<template>
  <div>
    <h2>GridStack con VUE</h2>
    <button @click="addWidget">Añadir widget</button>
    <button @click="eliminarWidget">Eliminar widget</button>
    <div class="grid-stack"></div>
  </div>
</template>

<style>

</style>
