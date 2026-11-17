import { TaskManager } from './models/TaskManager.js';
// Crear el gestor de tareas
const gestorTareas = new TaskManager();
/* 1. SELECTORES DEL DOM */
// Obtener los elementos del formulario
const formulario = document.querySelector('#form-tareas');
const inputTitulo = document.querySelector('#input-titulo');
const selectPrioridad = document.querySelector('#select-prioridad');
// Obtener la lista principal
const listaContenedor = document.querySelector('#lista-tareas');
// Obtener los botones de filtro
const botonesFiltro = document.querySelectorAll('.btn-filtro');
/*EVENTO DE LOS BOTONES DE LAS TAREAS */
// Delegación de eventos para cambiar el estado de una tarea
listaContenedor?.addEventListener('click', (event) => {
    // Obtener el elemento sobre el que se ha hecho clic
    const elemento = event.target;
    // Comprobar que el elemento pulsado es un botón HTML
    if (elemento instanceof HTMLButtonElement) {
        // Obtener el identificador de la tarea
        const idTarea = Number(elemento.getAttribute('data-id'));
        // Cambiar el estado de la tarea
        gestorTareas.cambiarEstado(idTarea);
    }
});
/* EVENTO DEL FORMULARIO */
// Gestionar el envío del formulario
formulario?.addEventListener('submit', (event) => {
    // Evitar que el formulario recargue la página
    event.preventDefault();
    // Comprobar que existen los campos del formulario
    if (!inputTitulo || !selectPrioridad) {
        return;
    }
    // Obtener los valores introducidos
    const titulo = inputTitulo.value.trim();
    const prioridad = selectPrioridad.value;
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
botonesFiltro.forEach((boton) => {
    boton.addEventListener('click', () => {
        // Quitar la clase active de los botones anteriores
        document.querySelector('.btn-filtro.active')?.classList.remove('active');
        // Activar el botón seleccionado
        boton.classList.add('active');
        // Obtener el filtro seleccionado
        const filtro = boton.getAttribute('data-filtro');
        // Actualizar el filtro en TaskManager
        if (filtro !== null) {
            gestorTareas.cambiarFiltro(filtro);
        }
    });
});
