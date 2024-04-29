<script>
import { Tabulator } from 'tabulator-tables';
import { datos } from '@/components/tabulator';
import "tabulator-tables//dist/css/tabulator_semanticui.min.css";

export default {
  data() {
    return {
      tabulator: null,
      datos: [], 
      columnas :[],
      mostrarComparacion: false
    };
  },
  created() {
    this.columnas = datos().agregarColumnas();
    this.datos = datos().compararDatos();
    console.log(typeof this.datos)
  },
  methods: {
    comparar() {
      this.columnas = datos().agregarColumnas(this.mostrarComparacion); 
      this.tabulator.setColumns(this.columnas);
    }
  },
  mounted() {
    this.tabulator = new Tabulator("#tabla", {
      data: this.datos,
      columns: this.columnas
    });
  }
};
</script>

<template>
  <div id="tabla"></div>
  <input type="checkbox" @click="comparar" v-model="mostrarComparacion">Visualizar periodo de comparación</input>
</template>