<template>
  <div
    v-if="!editMode"
    :class="{
      'grid-stack-item': loaded, //Añade la clase grid-stack-item al div si loaded es true.
    }"
  >
    <div
      :class="{
        'grid-stack-item-content': loaded,
      }"
    >
    <!-- :is indica que componente debe ser renderizado dinámicamente. 
    :data pasa datos al componente dinámicamente.-->
      <component
        :is="typewidget"  
        :data="widgetData"
        :widgetConfiguration="widgetsConfiguration"
        @changed="emitChange"
      ></component>
    </div>
  </div>
  <div
    v-else
    :class="{
      'grid-stack-item': loaded
    }"
  >
    <div
      :class="{
        'grid-stack-item-content': loaded,
      }"
    >
      <div class="btns_widgets">
        <button class="btn_info" @click="enableSettingsChart" v-if="configOption">
          <i class="bx bx-info-circle"></i>
        </button>
        <button
          v-if="configOption"
          class="bx bxs-cog conf_btn"
          ref="configButtons"
          @click="enableConfigWidget"
        ></button>
        <button class="removeItem" @click="remove">
          <i class="bx bx-x"></i>
        </button>
        <button @click="enableSettingsChart" class="bx bx-arrow-back btn_conf_back" />
      </div>
      <component
        :is="typewidget"
        :data="widgetData"
        :widgetConfiguration="widgetsConfiguration"
        @changed="emitChange"
      ></component>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Tabla from "@/components/Tabla.vue";

export default Vue.extend({
  name: "GridstackItem",
  components: {
    Tabla,
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
    enableConfigWidget() {
      this.$emit("enableSettings", this.id, this.typewidget);
    },
    enableSettingsChart() {
      this.enableSettings = !this.enableSettings;
    },
    remove() {
      this.masterLayout.grid.removeWidget(this.$el);
    },
    emitChange(data) {
      this.$emit("changed", data);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.loaded = true;
      this.masterLayout.grid.makeWidget(this.$el);
    });
  },
});
</script>

<style>
.grid-stack-item {
  perspective: 1800px;
  z-index: 99;
}

.grid-stack-item-content {
  box-shadow: var(--box-shadow-cards);
  transition: all 0.8s linear;
  background: #ffffff;
  transform-style: preserve-3d;
  border-radius: 8px;
  padding: 0;
}
</style>
