  <!-- 
  Descripción:
    Tu tarea es crear una aplicación simple de lista de tareas usando
    Vue 3. La aplicación debe permitir al usuario agregar nuevas
    tareas, editar las tareas, marcar las tareas como completadas y
    eliminar tareas de la lista.
  Requerimientos:
    • La aplicación debe tener un campo de texto donde los usuarios
    puedan ingresar nuevas tareas.
    • Debe haber una lista visible de todas las tareas, con
    casillas de verificación al lado de cada tarea para marcarlas
    como completadas.
    • Cada tarea en la lista debe tener un botón de "Eliminar" para
    eliminar esa tarea específica.
    • Las tareas completadas deben tener un estilo visual que las
    diferencie de las tareas no completadas.
    • Implementación de la lógica para guardar el estado de la lista de tareas
    en el almacenamiento local del navegador. Asegúrate de que la lista se
    recupere desde el almacenamiento local cuando se carga la aplicación. -->

  <script>
  export default {
    data() {
      return {
        nuevaTarea: "",
        tareas: []
      }
    },
    created(){
      this.tareas = JSON.parse(localStorage.getItem('tareas'))
    },
    methods: {
      crearTarea() {
          this.tareas.push({ id: Math.round(Math.random() * 1000), nombre: this.nuevaTarea, tareaCompletada: false })
          this.nuevaTarea = ""
          this.guardarTarea()
      },
      guardarTarea() {
        localStorage.setItem('tareas', JSON.stringify(this.tareas));
      },
      eliminarTarea(tarea) {
        this.tareas.splice(tarea, 1);
        this.guardarTarea();
      },
      actualizarTarea(tarea) {
        tarea.tareaCompletada = !tarea.tareaCompletada;
        this.guardarTarea();
      },
    }
  };
</script>

  <template>
    <div>
      <h3>Lista de tareas</h3>
      <input v-model="nuevaTarea" placeholder="Introduce una nueva tarea"></input>
      <button @click="crearTarea">Crear</button>
      <ul>
        <li v-for="tarea in tareas">
          <span :class="{ completada: tarea.tareaCompletada }">{{ tarea.nombre }}</span>
          <input type="checkbox" v-model="tarea.tareaCompletada" @click="actualizarTarea(tarea)">
          <button @click="eliminarTarea(tarea)">Eliminar</button>
        </li>
      </ul>
    </div>
  </template>

<style>
.completada {
  text-decoration: line-through;
}
</style>