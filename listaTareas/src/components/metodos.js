export const tareas = () => {
    return {
        cargarTodasLasTareas() {
            const listaTareas = JSON.parse(localStorage.getItem('listaTareas'));
            return listaTareas;
        },
        guardarTarea(listaTareas) { 
            localStorage.setItem('listaTareas', JSON.stringify(listaTareas));
        },
        eliminarTarea(tarea, listaTareas) {
            listaTareas.splice(tarea, 1);
            this.guardarTarea(listaTareas);
        }
    }
}
