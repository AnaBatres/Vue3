<script>
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { datos } from '@/components/tabulator';
import "tabulator-tables//dist/css/tabulator_semanticui.min.css";
 
export default {
  data() {
    return {
      tabulator: null,
      datos: [],
      /* fecha:"", */
      mostrarComparacion: false
    };
  },
  created() {
    /* this.columnas = datos().comparar();
    this.datos = datos().compararDatos();
    this.fecha = Object.keys(datos().cargarDatos())[0];
    console.log(this.fecha);
    console.log('datos',this.datos); */
  },
  //se actualiza automaticamente sin necesidad de devolver algo
  watch: {
    datos() {
      if(this.datos.length > 0) {
        this.crearTabla();
      }
     // console.error('error al crear la tabla');
    },
    comparar(newVal){
      this.comparar= newVal;
    }
  },
  //actualiza automaticamente, siempre tiene que tener return algo
  computed: {
    columnas() {
      return datos().comparar(this.mostrarComparacion);
    },
    datosTabla(){
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
      this.datos = datos().compararDatos();
      this.datosTabla;
    },
    crearTabla() {
      this.tabulator = new Tabulator("#tabla", {
        data: this.datosTabla,
        groupBy: "fecha",
        groupClosedShowCalcs: true,
        columns: this.columnas,
        groupHeader: function(value, count, data, group){
        return value + "<span></span>";
    },
    groupHeaderClipboard: function(value, count, data, group){
        return value + "<span style='color:#d00; margin-left:10px;'></span>";
    },
    });
    },
    comparar() {
      this.columnas = datos().comparar(this.mostrarComparacion);
      this.tabulator.setColumns(this.columnas);
    }
  },
  mounted() {
    this.cargarDatos();
  }
};
</script>
 
<template>
  <div id="tabla"></div>
  <input type="checkbox" @click="comparar" v-model="mostrarComparacion">Visualizar periodo de comparación</input>
</template>