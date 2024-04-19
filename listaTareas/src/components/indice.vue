<script>
import { tareas } from '@/components/metodos';

export default {
    data() {
        return {
            nuevaTarea: '',
            listaTareas: []
        };
    },
    created() {
        this.listaTareas = tareas().cargarTodasLasTareas();
    },
    methods: {
        guardarTarea() {
            this.listaTareas.push(tareas().crearTarea(this.nuevaTarea));
            tareas().guardarTarea(this.listaTareas);
            this.nuevaTarea = "";
        },
        eliminarTarea(id) {
            tareas().eliminarTarea(id, this.listaTareas);
        },
        actualizarTarea(tarea) {
            tareas().actualizarTarea(tarea, this.listaTareas);
        },
        limpiarCompletadas() {
            tareas().limpiarCompletadas(this.listaTareas);
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
        <ul>
            <li v-for="tarea in listaTareas">
                <span :class="{ completada: tarea.tareaCompletada }">{{ tarea.nombre }}</span>
                <input type="checkbox" v-model="tarea.tareaCompletada" @click="actualizarTarea(tarea)" />
                <button @click="eliminarTarea(tarea.id)">Eliminar</button>
            </li>
        </ul>
    </div>
</template>

<style>
.completada {
    text-decoration: line-through;
}
</style>