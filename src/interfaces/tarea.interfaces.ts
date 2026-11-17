// Define la estructura de una tarea
export interface Tarea {
    id: number;
    titulo: string;
    prioridad: 'Alta' | 'Media' | 'Baja';
    completada: boolean;
}