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
    comparar(mostrarComparacion) {
      this.mostrarComparacion = !this.mostrarComparacion;
      if (!mostrarComparacion) {
        this.filtrarPorHora();
        let columnas = [
          { title: "Hora", field: "hora" },
          { title: "Entradas", field: "entradas", bottomCalc: "sum" },
          { title: "Media", field: "media" }
        ];
        return columnas;
      } if (mostrarComparacion) {
        this.compararDatos();
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
      //filtroHora = filtroHora != null ? filtroHora : [];

      //añadir :00... a la hora de crear la tabla 
      datos.forEach(dato => {
        let hora = dato.hora.split(":")[0];
        let indice = filtroHora.findIndex(dato => dato.hora === hora + ":00" + "   -   " + hora + ":59");
        if (indice === -1) {
          filtroHora.push({ hora: hora + ":00" + "   -   " + hora + ":59", entradas: dato.entradas, media: dato.media, contador: 1 });
        } else {
          filtroHora[indice].contador++;
          filtroHora[indice].entradas += dato.entradas;
          filtroHora[indice].media = (filtroHora[indice].entradas / filtroHora[indice].contador).toFixed(2);
        }
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
        let indice = filtroHora.findIndex(dato => dato.hora === hora + ":00" + "   -   " + hora + ":59");
        if (indice === -1) {
          filtroHora.push({ hora: hora + ":00" + "   -   " + hora + ":59", entradas: dato.entradas, entradasComparacion: 0, media: 0, contador: 0, mediaComparacion: 0, fecha: "", fechaComparacion: ""});
          indice = (filtroHora.length - 1);
        }
        filtroHora[indice].contador++;
        filtroHora[indice].entradasComparacion += dato.entradas;
        filtroHora[indice].entradas = datos[indice].entradas;
        filtroHora[indice].media = (datos[indice].entradas / datos[indice].contador).toFixed(2);
        filtroHora[indice].mediaComparacion = (filtroHora[indice].entradas / filtroHora[indice].contador).toFixed(2);
        filtroHora[indice].fechaComparacion = "17/04/2024";
        filtroHora[indice].fecha = "16/04/2024";
        totalEntradas += dato.entradas;
      }
      );
      return filtroHora;
    },
     formatearHeaderTabla(comparar, fechas){
      console.log(comparar);
       if(comparar){
         return `${fechas.main} vs ${fechas.comparativa}`;
       }else{
        return fechas.main;
       }
     }
  };
};
