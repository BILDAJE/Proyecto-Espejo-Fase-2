
import { Tarea } from '../interfaces/tarea.interfaces.js';

export class TaskManager {

    /* PROPIEDADES PRIVADAS */

    // Array que almacena las tareas
    private tareas: Tarea[] = [];

    // Filtro seleccionado actualmente
    private filtroActual: string = 'Todas';

    // Clave utilizada para guardar las tareas
    private claveStorage: string = 'devtask_tareas';

    /* CONSTRUCTOR */

    constructor() {

        // Comprobar si existen tareas guardadas anteriormente
        const datosGuardados = localStorage.getItem(this.claveStorage);

        if (datosGuardados) {

            // Recuperar las tareas almacenadas
            this.tareas = JSON.parse(datosGuardados) as Tarea[];

        } else {

            // Cargar las tareas iniciales
            this.tareas = [
                {
                    id: 1,
                    titulo: 'Aprender la sintaxis de ES6',
                    prioridad: 'Alta',
                    completada: true
                },
                {
                    id: 2,
                    titulo: 'Dominar la asincronía y Fetch',
                    prioridad: 'Media',
                    completada: false
                },
                {
                    id: 3,
                    titulo: 'Migrar el proyecto a Angular',
                    prioridad: 'Baja',
                    completada: false
                }
            ];

            // Guardar las tareas iniciales
            this.guardarTareas();
        }

        // Inicializar la aplicación
        this.inicializarApp();
    }

    /* MÉTODOS PRIVADOS */

    // Guardar las tareas en localStorage
    private guardarTareas(): void {
        localStorage.setItem(
            this.claveStorage,
            JSON.stringify(this.tareas)
        );
    }

    // Inicializar la aplicación con una espera simulada
    private async inicializarApp(): Promise<void> {

        // Simular una espera de 1,5 segundos
        await new Promise<void>((resolve) => {
            setTimeout(resolve, 1500);
        });

        // Obtener el mensaje de carga
        const loadingState = document.getElementById('loading-state') as HTMLDivElement;

        // Comprobar que existe el elemento
        if (loadingState) {
            loadingState.style.display = 'none';
        }

        // Mostrar las tareas
        this.pintarTareas();
    }

    /* MÉTODO PARA AGREGAR TAREAS */

    public agregarTarea(titulo: string, prioridad: 'Alta' | 'Media' | 'Baja'): void {

        // Crear una nueva tarea
        const nuevaTarea: Tarea = {
            id: Date.now(),
            titulo: titulo,
            prioridad: prioridad,
            completada: false
        };

        // Añadir la tarea sin modificar el array original
        this.tareas = [...this.tareas, nuevaTarea];

        // Guardar los cambios
        this.guardarTareas();

        // Actualizar las listas
        this.pintarTareas();
    }

    /* MÉTODO PARA CAMBIAR EL ESTADO */

    public cambiarEstado(idTarea: number): void {

        // Crear un nuevo array con el estado actualizado
        this.tareas = this.tareas.map((tarea) => {

            if (tarea.id === idTarea) {
                return {
                    ...tarea,
                    completada: !tarea.completada
                };
            }

            return tarea;
        });

        // Guardar los cambios
        this.guardarTareas();

        // Actualizar las listas
        this.pintarTareas();
    }

    /* MÉTODO PARA CAMBIAR EL FILTRO */

    public cambiarFiltro(filtro: string): void {
        this.filtroActual = filtro;

        // Volver a pintar las tareas
        this.pintarTareas();
    }

    /* MÉTODO PARA PINTAR LAS TAREAS */

    public pintarTareas(): void {

        // Obtener el contenedor de la lista principal
        const listaContenedor = document.getElementById('lista-tareas') as HTMLUListElement;

        // Comprobar que existe la lista
        if (!listaContenedor) {
            return;
        }

        // Limpiar la lista
        listaContenedor.innerHTML = '';

        // Filtrar las tareas según el filtro seleccionado
        const tareasFiltradas = this.tareas.filter((tarea) => {

            if (this.filtroActual === 'Pendientes') {
                return tarea.completada === false;
            }

            if (this.filtroActual === 'Completadas') {
                return tarea.completada === true;
            }

            return true;
        });

        // Recorrer las tareas filtradas
        tareasFiltradas.forEach((tarea) => {

            // Crear el elemento de la tarea
            const elementoTarea = document.createElement('li');

            // Añadir las clases correspondientes
            elementoTarea.classList.add('item-tarea');
            elementoTarea.classList.add(tarea.prioridad);

            if (tarea.completada) {
                elementoTarea.classList.add('completada');
            }

            // Crear el texto de la tarea
            const textoTarea = document.createElement('span');
            textoTarea.textContent = tarea.titulo;

            // Crear el botón para cambiar el estado
            const botonEstado = document.createElement('button');

            // Añadir una clase al botón
            botonEstado.classList.add('btn-estado');

            // Guardar el identificador de la tarea
            botonEstado.dataset.id = tarea.id.toString();

            if (tarea.completada) {
                botonEstado.textContent = 'Marcar pendiente';
            } else {
                botonEstado.textContent = 'Marcar completada';
            }

            // Añadir los elementos a la tarea
            elementoTarea.appendChild(textoTarea);
            elementoTarea.appendChild(botonEstado);

            // Añadir la tarea a la lista principal
            listaContenedor.appendChild(elementoTarea);
        });

        /* LISTA ESPEJO */

        // Obtener el contenedor de la lista espejo
        const listaEspejo = document.getElementById('lista-espejo') as HTMLUListElement;

        // Comprobar que existe la lista
        if (!listaEspejo) {
            return;
        }

        // Limpiar la lista espejo
        listaEspejo.innerHTML = '';

        // Mostrar todas las tareas, independientemente del filtro
        this.tareas.forEach((tarea) => {

            const elementoEspejo = document.createElement('li');

            elementoEspejo.classList.add('item-tarea');
            elementoEspejo.classList.add(tarea.prioridad);

            if (tarea.completada) {
                elementoEspejo.classList.add('completada');
            }

            const textoEspejo = document.createElement('span');
            textoEspejo.textContent = tarea.titulo;

            elementoEspejo.appendChild(textoEspejo);
            listaEspejo.appendChild(elementoEspejo);
        });
    }
}
