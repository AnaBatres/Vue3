export const tareas = () => {
    return {
        cargarTodasLasTareas() {
            let listaTareas = JSON.parse(localStorage.getItem('listaTareas'));
            listaTareas = listaTareas != null ? listaTareas : [];
            return listaTareas;
        },
        crearTarea(tarea) {
            return { id: Math.round(Math.random() * 1000), nombre: tarea, tareaCompletada: false };
        },
        guardarTarea(listaTareas) {
            localStorage.setItem('listaTareas', JSON.stringify(listaTareas));
        },
        eliminarTarea(id, listaTareas) {
            for (let i = 0; i < listaTareas.length; i++) {
                const tarea = listaTareas[i];
                if (id == tarea.id) {
                    listaTareas.splice(i, 1);
                    this.guardarTarea(listaTareas);
                }
            }
        },
        actualizarTarea(tarea, listaTareas) {
            tarea.tareaCompletada = !tarea.tareaCompletada;
            this.guardarTarea(listaTareas);
        },
        limpiarCompletadas(listaTareas) {
            const tareasIncompletas = listaTareas.filter(tareas => tareas.tareaCompletada == false);
            this.guardarTarea(tareasIncompletas);
        },
        contarTareasRealizadas(listaTareas) {
            const tareasRealizadas = listaTareas.reduce((contador, tarea) => {
                if (tarea.tareaCompletada === true) {
                    contador++;
                }
                return contador;
            }, 0);
            return tareasRealizadas;
        }
    }
}
