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
      console.log('this.datos en la propiedad computada', this.datos);
      if(this.datos.length > 0) {
        this.crearTabla();
      }
     // console.error('error al crear la tabla');
    },
    
  },
  //actualiza automaticamente, siempre tiene que tener return algo
  computed: {
    columnas() {
      return datos().comparar(this.mostrarComparacion);
    }
  },
  methods: {
    cargarDatos() {
      this.datos = datos().compararDatos();
    },
    crearTabla() {
      console.log("Los datos que vamos a agrupar", this.datos);
      this.tabulator = new Tabulator("#tabla", {
        data: this.datos,
        groupBy: "fecha",
        groupClosedShowCalcs: true,
        columns: this.columnas
    });
    console.log(this.tabulator);
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