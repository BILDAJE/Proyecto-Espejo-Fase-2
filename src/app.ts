
import { TaskManager } from './models/TaskManager.js';

// Crear el gestor de tareas
const gestorTareas = new TaskManager();

/* SELECTORES DEL DOM */

// Obtener los elementos del formulario
const formulario = document.getElementById('form-tareas') as HTMLFormElement;
const inputTitulo = document.getElementById('input-titulo') as HTMLInputElement;
const selectPrioridad = document.getElementById('select-prioridad') as HTMLSelectElement;

// Obtener la lista principal
const listaContenedor = document.getElementById('lista-tareas') as HTMLUListElement;

// Obtener los botones de filtro
const botonesFiltro = document.getElementsByClassName('btn-filtro');

/* EVENTO DE LOS BOTONES DE LAS TAREAS */

// Delegación de eventos para cambiar el estado de una tarea
listaContenedor.addEventListener('click', (event: MouseEvent) => {

    // Obtener el elemento sobre el que se ha hecho clic
    const elemento = event.target as HTMLElement;

    // Comprobar si se ha pulsado el botón de cambiar estado
    if (elemento.classList.contains('btn-estado')) {

        // Obtener el identificador de la tarea
        const idTarea = parseInt((elemento as HTMLButtonElement).dataset.id as string);

        // Cambiar el estado de la tarea
        gestorTareas.cambiarEstado(idTarea);
    }
});

/* EVENTO DEL FORMULARIO */

// Gestionar el envío del formulario
formulario.addEventListener('submit', (event: SubmitEvent) => {

    // Evitar que el formulario recargue la página
    event.preventDefault();

    // Obtener los valores introducidos
    const titulo = inputTitulo.value.trim();

    const prioridad = selectPrioridad.value as 'Alta' | 'Media' | 'Baja';

    // Comprobar que el título no esté vacío
    if (titulo === '') {
        return;
    }

    // Añadir la tarea mediante el gestor
    gestorTareas.agregarTarea(titulo, prioridad);

    // Limpiar el formulario
    formulario.reset();
});

/* EVENTOS DE LOS BOTONES DE FILTRADO */

// Recorrer todos los botones de filtro
for (let i = 0; i < botonesFiltro.length; i++) {

    const boton = botonesFiltro[i] as HTMLButtonElement;

    boton.addEventListener('click', () => {

        // Quitar la clase active de los botones anteriores
        const botonActivo = document.querySelector('.btn-filtro.active');

        if (botonActivo) {
            botonActivo.classList.remove('active');
        }

        // Activar el botón seleccionado
        boton.classList.add('active');

        // Obtener el filtro seleccionado
        const filtro = boton.dataset.filtro;

        // Actualizar el filtro en TaskManager
        if (filtro) {
            gestorTareas.cambiarFiltro(filtro);
        }
    });
}
