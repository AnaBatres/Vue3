<script>
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';

export default {
  data() {
    return {
      grid: null,
    };
  },
  methods: {
    inicializarGrid() {
      this.grid = GridStack.init(
       // {float: true}
      );
    },
    addWidget() {
      const x = (Math.random() * 10).toFixed();
      const y = (Math.random() * 10).toFixed();
      const w = (Math.random() * 3).toFixed();
      const h = (Math.random() * 3).toFixed();

      this.grid.addWidget({ x, y, w, h });
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
    <div class="grid-stack">
    
    </div>
  </div>
</template>

<style>
.grid-stack-item-content {
  background: #d993e3;
  margin: 10%;
}
</style>
