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
        guardarTarea(tarea) {
            let listaTareas = this.cargarTodasLasTareas();
            listaTareas.push(tarea);
            localStorage.setItem('listaTareas', JSON.stringify(listaTareas));
        },
        eliminarTarea(idTarea) {
            let listaTareas = this.cargarTodasLasTareas();
            listaTareas = listaTareas.filter(tareas => tareas.id !== idTarea);
            localStorage.setItem('listaTareas', JSON.stringify(listaTareas));
        },
        actualizarCampoTareaCompletada(tarea) {
            let listaTareas = this.cargarTodasLasTareas();
            let tareaEncontrada = listaTareas.find(tareas => tareas.id === tarea.id);
            if (tareaEncontrada) {
                tareaEncontrada.tareaCompletada = !tareaEncontrada.tareaCompletada;
            }
            localStorage.setItem('listaTareas', JSON.stringify(listaTareas));

            // tarea.tareaCompletada = !tarea.tareaCompletada;
            // let tareaActualizada = tarea;
            // this.eliminarTarea(tarea.id);
            // this.guardarTarea(tareaActualizada);    
        },
        limpiarCompletadas() {
            let listaTareas = this.cargarTodasLasTareas();
            const tareasIncompletas = listaTareas.filter(tareas => tareas.tareaCompletada == false);
            localStorage.setItem('listaTareas', JSON.stringify(tareasIncompletas));
        },
        contarTareasRealizadas() {
            let listaTareas = JSON.parse(localStorage.getItem('listaTareas'));
            if (listaTareas !== null) {
                const tareasRealizadas = listaTareas.reduce((contador, tarea) => {
                    if (tarea && tarea.tareaCompletada === true) {
                        contador++;
                    }
                    return contador;
                }, 0);
                return tareasRealizadas;

            }
        },
        seleccionarTodasTareas() {
            let listaTareas = this.cargarTodasLasTareas();
            const todasSeleccionadas = listaTareas.reduce((tareas, tarea) => {
                if (!tarea.tareaCompletada || tarea.tareaCompletada) {
                    tarea.tareaCompletada = true;
                    tareas.push(tarea);
                }
                return tareas;
            }, []);
            localStorage.setItem('listaTareas', JSON.stringify(todasSeleccionadas));
        }
    }
}
