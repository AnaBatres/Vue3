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
            this.listaTareas.push({ id: Math.round(Math.random() * 1000), nombre: this.nuevaTarea, tareaCompletada: false });
            tareas().guardarTarea(this.listaTareas);
        },
        eliminarTarea(tarea) {
            tareas().eliminarTarea(tarea, this.listaTareas);
        },
        actualizarTarea(tarea){
            tareas().actualizarTarea(tarea,this.listaTareas)
        }
    }
};

</script>

<template>
    <div>
        <h3>LISTA DE TAREAS</h3>
        <input v-model="nuevaTarea" placeholder="Introduce una nueva tarea" />
        <button @click="guardarTarea">Crear</button>
        <ul>
            <li v-for="tarea in listaTareas">
                <span :class="{ completada: tarea.tareaCompletada }">{{ tarea.nombre }}</span>
                <button @click="eliminarTarea(tarea)">Eliminar</button>
                <input v-model="tarea.tareaCompletada" @click="actualizarTarea" type="checkbox" />
            </li>
        </ul>
    </div>
</template>

<style>
.completada {
    text-decoration: line-through;
}
</style>