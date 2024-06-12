<template>
    <div
      :class="{
        'grid-stack-item-content': loaded,
      }"
    >
      <component
        :is="typewidget"
        :data="widgetData"
        :widgetConfiguration="widgetsConfiguration"
        @changed="emitChange"
      ></component>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Tabla from './Tabla.vue';

export default defineComponent({
  name: "GridstackItem",
  components: {
    Tabla
  },
  data() {
    return {
      loaded: false,
      enableSettings: false,
    };
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
  },
  mounted() {
    this.$nextTick(() => {
      this.loaded = true;
      this.masterLayout.grid.makeWidget(this.$el);
    });
  }
});
</script>

<style></style>
