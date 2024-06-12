<template>
  <div>
    <button @click="addWidget">Añadir widget</button>
    <div class="grid-stack">
      <div v-if="widget" class="grid-stack-item">
        <GridstackItem 
        :widgetType="widget.type" 
        :widgetData="widget.data"
        :widgetsConfiguration="widget.configuration" />
      </div>
    </div>
  </div>
</template> 

<script>
import { defineComponent } from 'vue';
import { GridStack } from 'gridstack';
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.min.css";
import GridstackItem from "./GridStackItem.vue";

export default defineComponent({
  name: "Grid",
  components: {
    GridstackItem,
  },
  props: {
    float: {
      type: Boolean,
      default: false,
    },
    static: {
      type: Boolean,
      default: false, // Indica si la cuadrícula es estática o no
    },
  },
  data() {
    return {
      gridOptions: {
        float: this.float,
        static: this.static 
      },
      grid: null,
      widget: null,
    };
  },
  provide() {
    return {
      masterLayout: this,
    };
  },
  methods: {
    addWidget() {
      this.widget = {
        type: 'Tabla',
      };
      this.$nextTick(() => {
        this.grid.makeWidget(this.$el.querySelector('.grid-stack-item'));
      });
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

<style scoped></style>
