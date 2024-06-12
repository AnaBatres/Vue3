<template>
  <div class="grid-stack-item-content">
    <component :is="masterLayout.widget.typewidget" :data="masterLayout.widget.data"
      :widgetConfiguration="masterLayout.widget.configuration" @changed="emitChange"></component>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Tabla from "./Tabla.vue";

export default defineComponent({
  name: "GridstackItem",
  components: {
    Tabla,
  },
  inject: {
    masterLayout: {
      default: null, // Inyección del componente padre
    },
  },
  methods: {
    emitChange(data) {
      this.$emit("changed", data);
    },
    mounted() {
      this.$nextTick(() => {
        this.masterLayout.grid.makeWidget(this.$el);
      });
    }
  }   
});
</script>

<style></style>
