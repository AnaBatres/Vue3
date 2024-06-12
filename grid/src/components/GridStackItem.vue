<template>
  <div
    :class="{
      'grid-stack-item-content': loaded,
    }"
  >
    <component
      :is="widgetType"
      :data="widgetData"
      :widgetConfiguration="widgetsConfiguration"
      @changed="emitChange"
    ></component>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: "GridstackItem",
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
      enableSettings: false,
    };
  },
  inject: {
    masterLayout: {
      default: null,
    },
  },
  methods: {
    emitChange(data) {
      this.$emit("changed", data);
    },
    mounted() {
      this.$nextTick(() => {
        this.loaded = true;
        this.masterLayout.grid.makeWidget(this.$el);
      });
    }
  }   
});
</script>

<style></style>
