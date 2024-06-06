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
import Vue from 'vue';


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
    addWidget() {

    },
    //emite el evento update:layout con un valor (this.layout).
    emitLayout() {
      this.$emit("update:layout", this.layout);
    },
    removeItem(id) {
      const index = this.grid.engine.nodes.findIndex((n) => n.id == id);
      this.grid.removeWidget(this.grid.engine.nodes[index].el, true, true);
    },
    //inicializa grid y añade las opciones
    loadGrid() {
      this.grid = GridStack.addGrid(
        document.querySelector(".grid-stack"),
        this.gridOptions
      );
    },
    async saveGridMethod() {
      if (this.idLayout === undefined) {
        let gridSaveData = this.grid.save(false);
        const dataToSave = {
          grid: gridSaveData,
          widgetsData: this.layout,
        };
        const gridManager = layout(this.type);

        gridManager.save(this.info, dataToSave, this.type);

        this.$emit("saveCompleted");
      } else {
        const gridSaveData = this.grid.save(false);

        const dataToSave = {
          grid: gridSaveData,
          widgetsData: this.layout,
        };
        try {
          const response = await layout().editLayoutById(
            this.idLayout,
            dataToSave
          );

          this.$emit("saveCompleted");
        } catch (error) {
          console.error("Ocurrió un error al intentar actualizar el layout:", error);
        }
      }
    },
  },
  mounted() {
    this.inicializarGrid();
  }
});
</script>

<style></style>
