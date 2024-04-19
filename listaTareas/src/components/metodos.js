export const tareas = () => {
    return {
        cargarTodasLasTareas() {
            const listaTareas = JSON.parse(localStorage.getItem('listaTareas'));
            listaTareas != null ? listaTareas : [];
            return listaTareas;
        },
        guardarTarea(listaTareas) { 
            localStorage.setItem('listaTareas', JSON.stringify(listaTareas));
        },
        eliminarTarea(tarea, listaTareas) {
            listaTareas.splice(tarea, 1);
            this.guardarTarea(listaTareas);
        }, 
        actualizarTarea(tarea, listaTareas){
            tarea.tareaCompletada = !tarea.tareaCompletada;
            this.guardarTarea(listaTareas);

        }
    }
}
