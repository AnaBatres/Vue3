export const datos = () => {
  return {
    cargarDatos() {
      const datos = {
        "17/04/2024": [
          { hora: "8:15", entradas: 15 },
          { hora: "8:30", entradas: 25 },
          { hora: "8:45", entradas: 12 },
          { hora: "9:05", entradas: 20 },
          { hora: "9:20", entradas: 18 },
          { hora: "9:35", entradas: 30 },
          { hora: "9:50", entradas: 22 },
          { hora: "10:00", entradas: 28 },
          { hora: "10:15", entradas: 35 },
          { hora: "10:30", entradas: 40 }
        ]
      };
      return datos;
    },
    cargarDatosComparativos() {
      const datosComparativos = {
        "16/04/2024": [
          { hora: "8:00", entradas: 10 },
          { hora: "8:15", entradas: 22 },
          { hora: "8:30", entradas: 18 },
          { hora: "8:45", entradas: 25 },
          { hora: "9:00", entradas: 30 },
          { hora: "9:15", entradas: 28 },
          { hora: "9:30", entradas: 35 },
          { hora: "9:45", entradas: 20 },
          { hora: "10:00", entradas: 15 },
          { hora: "10:15", entradas: 12 }
        ]
      };
      return datosComparativos;
    },
    agregarColumnas(mostrarComparacion) {
      this.mostrarComparacion = !this.mostrarComparacion;
      if (!mostrarComparacion) {
        let columnas = [
          { title: "Hora", field: "hora" },
          { title: "Entradas", field: "entradas", bottomCalc: "sum" },
          { title: "Media", field: "media" }
        ];
        return columnas;
      } if (mostrarComparacion) {
        let columnas = [
          { title: "Hora", field: "hora" },
          { title: "Entradas", field: "entradas", bottomCalc: "sum" },
          { title: "Entradas Comparacion", field: "entradasComparacion" },
          { title: "Media", field: "media" },
          { title: "Media Comparacion", field: "mediaComparacion" },
        ];
        return columnas;
      }
    },
    filtrarPorHora() {
      let datos = this.cargarDatos()["17/04/2024"];
      let filtroHora = [];
      datos.forEach(dato => {
        let hora = dato.hora.split(":")[0];
        if (!filtroHora[hora]) {
          filtroHora[hora] = { hora: hora + ":00" + "   -   " + hora + ":59", entradas: 0, media: 0, contador: 0 };
        }
        filtroHora[hora].contador++;
        filtroHora[hora].entradas += dato.entradas;
        filtroHora[hora].media = (filtroHora[hora].entradas / filtroHora[hora].contador).toFixed(2);
      });
      return filtroHora;
    },
    compararDatos() {
      let datos = this.filtrarPorHora();
      let totalEntradas = 0;
      let datosComparativos = this.cargarDatosComparativos()["16/04/2024"];
      let filtroHora = [];
      datosComparativos.forEach(dato => {
        let hora = dato.hora.split(":")[0];
        if (!filtroHora[hora]) {
          filtroHora[hora] = { hora: hora + ":00" + "   -   " + hora + ":59", entradas: 0, entradasComparacion: 0, media: 0, contador: 0, mediaComparacion: 0, fecha: ""};
        }
        //console.log(datos[hora].entradas);
        filtroHora[hora].contador++;
        filtroHora[hora].entradasComparacion += dato.entradas;
        filtroHora[hora].entradas = datos[hora].entradas;
        console.log(filtroHora[hora].entradasComparacion);
        filtroHora[hora].media = (datos[hora].entradas / datos[hora].contador).toFixed(2);
        filtroHora[hora].mediaComparacion = (filtroHora[hora].entradas / filtroHora[hora].contador).toFixed(2);
        totalEntradas += dato.entradas;
      });
      // filtroHora.push({ hora: "Total", entradas: totalEntradas, entradasComparacion: 0, media: 0, contador: 0, mediaComparacion: 0 })
      return filtroHora;
    }
  };
};
