<template>
  <div :class="{ 'grid-stack-item-content': loaded }">
    <component
      :is="widgetType"
      :data="widgetData"
      :widgetConfiguration="widgetsConfiguration"
    ></component>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Tabla from './Tabla.vue'; 

export default defineComponent({
  name: "GridstackItem",
  components: {
    Tabla,
  },
  props: {
    widgetType: {
      type: String,
      required: true,
    },
    widgetData: {
      type: Object,
      required: true,
    },
    widgetsConfiguration: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loaded: false,
    };
  },
  inject: {
    masterLayout: {
      default: null,
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

<style scoped>
</style>
