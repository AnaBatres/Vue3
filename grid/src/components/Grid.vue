<script>
import 'gridstack/dist/gridstack.min.css';
import { GridStack } from 'gridstack';
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { datos } from '@/components/tabulator';
import "tabulator-tables//dist/css/tabulator_semanticui.min.css";

export default {
  data() {
    return {
      grid: null,
      tabulator: null,
      datos: [],
      mostrarComparacion: true,
      mostrarDatos: false,
      formatoFecha: "dd/MM/yyyy"
    };
  },
  watch: {
    datos() {
      if (this.datos.length > 0) {
        this.crearTabla();
        this.inicializarGrid();
      }
    }
  },
  computed: {
    columnas() {
      return datos().crearColumnas(this.mostrarComparacion, false);
    },
    datosTabla() {
      let datosTablas = this.datos.map((element) => {
        let fechas = {
          main: element.fecha,
          comparativa: element.fechaComparacion
        }
        return { fecha: datos().formatearHeaderTabla(this.mostrarComparacion, fechas, this.formatoFecha), entradas: element.entradas, hora: element.hora, media: element.media, entradasComparacion: element.entradasComparacion, mediaComparacion: element.mediaComparacion }
      })
      console.log(datosTablas);
      return datosTablas;
    }
  },
  methods: {
    cargarDatos() {
      this.mostrarComparacion = !this.mostrarComparacion;
      this.datos = datos().crearColumnas(this.mostrarComparacion, true);
      console.log("this.datos --> ", this.datos);
      this.datosTabla;
    },
    formatearFechas() {
      this.formatoFecha = this.$refs.fechas.value;
      console.log("fecha --> ", this.formatoFecha);
      this.crearTabla();
    },
    crearTabla() {
      this.tabulator = new Tabulator("#tabla", {
        data: this.datosTabla,
        groupBy: "fecha",
        groupClosedShowCalcs: true,
        columns: this.columnas
      });
    },
    inicializarGrid() {
      this.grid = GridStack.init(
        { float: true }
      );
    },
    addWidget() {
      let tabla = this.crearTabla();
      tabla = this.cargarDatos();
      this.grid.addWidget(tabla);
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
    <div class="grid-stack">
      <div class="grid-stack-item">
          <div id="tabla">
          </div>
      </div>
    </div>
  </div>
</template>

<style>
.grid-stack-item-content {
  width: 100%;
  height: 100%
}
</style>
