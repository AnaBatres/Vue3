<template>
  <button @click="addWidget">Añadir widget</button>
  <button @click="removeItem">Eliminar widget</button>
  <div class="grid-stack">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { GridStack } from 'gridstack';
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";


export default defineComponent({
  name: "Grid",
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
    save: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: undefined,
    },
    height: {
      type: Number,
      default: undefined,
    },
    widgettype: {
      type: String,
    },
    zone: {
      type: String,
    },
  },
  data() {
    return {
      columns: "12",
      gridOptions: {
        resize: true,
        column: this.columns,
        cellHeight: this.cellHeight,
        animate: true,
        float: this.float,
        acceptWidgets: true,
        staticGrid: this.static,
        compact: true,
      },
      grid: null,
      saveGrid: this.save,
    };
  },
  watch: {
    save() {
      this.saveGridMethod();
      this.saveGrid = false;
    },
  },
  provide() {
    return {
      masterLayout: this,
    }
  },
  methods: {
    //emite el evento update:layout con un valor (this.layout).
    emitLayout() {
      this.$emit("update:layout", this.layout);
    },
    addWidget() {
      const data = {
        width: this.width,
        height: this.height,
        widgettype: "Tabla",
        zone: this.zone,
      };
      this.$emit("addWidget", data);
    },
    removeItem(id) {
      const index = this.grid.engine.nodes.findIndex((n) => n.id == id);
      this.grid.removeWidget(this.grid.engine.nodes[index].el, true, true);
    },
    //inicializa grid y añade las opciones
    loadGrid() {
      this.grid = GridStack.init(this.gridOptions, '.grid-stack');
    }
  },
  mounted() {
    this.loadGrid();
  }
});
</script>

<style></style>
thislayout=