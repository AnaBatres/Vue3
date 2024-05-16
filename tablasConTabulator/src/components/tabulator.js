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
    crearColumnas(mostrarComparacion, mostrarDatos) {
      let columnas = [{ title: "Hora", field: "hora", bottomCalc: this.total },
      { title: "Entradas", field: "entradas", bottomCalc: "sum" }];

      if (mostrarComparacion && !mostrarDatos) {
        columnas.push({ title: "Entradas Comparacion", field: "entradasComparacion", bottomCalc: "sum" },
          { title: "Media", field: "media", bottomCalc: "sum" },
          { title: "Media Comparacion", field: "mediaComparacion", bottomCalc: "sum" });
      } else if (!mostrarComparacion && !mostrarDatos) {
        columnas.push({ title: "Media", field: "media", bottomCalc: "sum" });
      } else if(!mostrarComparacion && mostrarDatos){
        return this.filtrarPorHora();
      } else if (mostrarDatos && mostrarDatos){
        return this.compararDatos();
      }
      return columnas;
    },
    total() {
      return "TOTAL";
    },
    filtrarPorHora() {
      let datos = this.cargarDatos()["17/04/2024"];
      let filtroHora = [];
      datos.map((element) => {
        let hora = element.hora.split(":")[0];
        let horaCompleta = `${hora}:00 - ${hora}:59`;
        let indice = filtroHora.findIndex(dato => dato.hora === horaCompleta);
        if (indice === -1) {
          filtroHora.push({ hora: horaCompleta,entradas: element.entradas,media: element.media,contador: 1,fecha: "16/04/2024" });
        } else {
          filtroHora[indice].contador++;
          filtroHora[indice].entradas += element.entradas;
          filtroHora[indice].media = (filtroHora[indice].entradas / filtroHora[indice].contador).toFixed(2);
        }
      });
      console.log("map --> ", filtroHora);
      return filtroHora;
    },
    compararDatos() {
      let datos = this.filtrarPorHora();
      let totalEntradas = 0;
      let datosComparativos = this.cargarDatosComparativos()["16/04/2024"];
      const filtroHora = [];

      datosComparativos.map((element) => {
        const hora = element.hora.split(":")[0];
        const horaCompleta = `${hora}:00 - ${hora}:59`;
        let indice = filtroHora.findIndex(dato => dato.hora === horaCompleta);

        if (indice === -1) {
          filtroHora.push({ hora: horaCompleta, entradas: 0, entradasComparacion: 0, media: 0, contador: 0, mediaComparacion: 0, fecha: "16/04/2024", fechaComparacion: "17/04/2024" });
          indice = (filtroHora.length - 1);
        }
        filtroHora[indice].contador++;
        filtroHora[indice].entradasComparacion += element.entradas;
        filtroHora[indice].entradas = datos[indice].entradas;
        filtroHora[indice].media = (datos[indice].entradas / datos[indice].contador).toFixed(2);
        filtroHora[indice].mediaComparacion = (filtroHora[indice].entradasComparacion / filtroHora[indice].contador).toFixed(2);
        totalEntradas += element.entradas;
      });
      console.log("map2 --> ", filtroHora);
      return filtroHora;
    },
    formatearHeaderTabla(comparar, fechas) {
      console.log(comparar);
      if (comparar) {
        return `${fechas.main} vs ${fechas.comparativa}`;
      } else {
        return fechas.main;
      }
    }
  };
};
