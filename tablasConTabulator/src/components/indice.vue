<script>
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { datos } from '@/components/tabulator';
import "tabulator-tables//dist/css/tabulator_semanticui.min.css";

export default {
  data() {
    return {
      tabulator: null,
      datos: [],
      mostrarComparacion: true, 
      mostrarDatos: false
    };
  },
  //se actualiza automaticamente sin necesidad de devolver algo
  watch: {
    datos() {
      if (this.datos.length > 0) {
        this.crearTabla();
      }
    }
  },
  //actualiza automaticamente, siempre tiene que tener return algo
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
        return { fecha: datos().formatearHeaderTabla(this.mostrarComparacion, fechas), entradas: element.entradas, hora: element.hora, media: element.media, entradasComparacion: element.entradasComparacion, mediaComparacion: element.mediaComparacion }
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
    crearTabla() {
      this.tabulator = new Tabulator("#tabla", {
        data: this.datosTabla,
        groupBy: "fecha",
        groupClosedShowCalcs: true,
        columns: this.columnas
      });
    }
  },
  mounted() {
    this.cargarDatos();
  }
};
</script>

<template>
  <div id="tabla"></div>
  <input type="checkbox" @click="cargarDatos" v-model="mostrarComparacion">Visualizar periodo de comparación</input>
</template>