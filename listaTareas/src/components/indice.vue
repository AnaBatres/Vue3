<script>
import { tareas } from '@/components/metodos2';

export default {
    data() {
        return {
            nuevaTarea: '',
            listaTareas: [],
            totalTareas: 0,
            tareasRealizadas:0, 
            tareasIncompletas:0  
        };
    },
    created() {
        this.listaTareas = tareas().cargarTodasLasTareas();
        this.tareasRealizadas = tareas().contarTareasRealizadas();
        this.totalTareas = this.listaTareas.length;
        this.tareasIncompletas = (this.totalTareas - this.tareasRealizadas);
    },
    methods: {
        actualizarContadores(){
            this.tareasRealizadas = tareas().contarTareasRealizadas();
            this.totalTareas = this.listaTareas.length;
            this.tareasIncompletas = (this.totalTareas - this.tareasRealizadas);
        },
        guardarTarea() {
            tareas().guardarTarea(tareas().crearTarea(this.nuevaTarea));
            this.listaTareas = tareas().cargarTodasLasTareas();
            this.nuevaTarea = "";
            this.actualizarContadores();
        },
        eliminarTarea(tarea) {
            tareas().eliminarTarea(tarea);
            this.listaTareas = tareas().cargarTodasLasTareas();
            this.actualizarContadores();
        },
        actualizarCampoTareaCompletada(tarea) {
            tareas().actualizarCampoTareaCompletada(tarea);
            this.actualizarContadores();
            this.listaTareas = tareas().cargarTodasLasTareas(); 
        },
        limpiarCompletadas() {
            tareas().limpiarCompletadas();
            this.listaTareas = tareas().cargarTodasLasTareas();
            this.actualizarContadores();
        },
        seleccionarTodasTareas(){
            tareas().seleccionarTodasTareas();
            this.listaTareas = tareas().cargarTodasLasTareas();
        }
    }
};
</script>

<template>
    <div>
        <h3>LISTA DE TAREAS</h3>
        <input v-model="nuevaTarea" placeholder="Introduce una nueva tarea" />
        <button @click="guardarTarea">Crear</button>
        <button @click="limpiarCompletadas">Limpiar completadas</button>
        <button @click="seleccionarTodasTareas">Seleccionar todas las tareas</button>
        <ul>
            <li v-for="tarea in listaTareas">
                <span :class="{ completada: tarea.tareaCompletada }">{{ tarea.nombre }}</span>
                <input type="checkbox" v-model="tarea.tareaCompletada" @click="actualizarCampoTareaCompletada(tarea)" />
                <button @click="eliminarTarea(tarea.id)">Eliminar</button>
            </li>
        </ul>
        <p>Tareas en total: {{ this.totalTareas }}</p>
        <p>Tareas realizadas: {{ this.tareasRealizadas }}</p>
        <p>Tareas por realizar: {{ this.tareasIncompletas }}</p>
    </div>
</template>

<style>
.completada {
    text-decoration: line-through;
}
</style>