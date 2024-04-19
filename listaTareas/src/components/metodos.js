export const tareas = () => {
    return {
        cargarTodasLasTareas() {
            const listaTareas = JSON.parse(localStorage.getItem('listaTareas'));
            listaTareas != null ? listaTareas : [];
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
            let tareasIncompletas=[];
            for (let i = 0; i < listaTareas.length; i++) {
                const tarea = listaTareas[i];
                if (!tarea.tareaCompletada) {
                    tareasIncompletas.push(tarea);
                }
            }
        this.guardarTarea(tareasIncompletas);
        }
    }
}
