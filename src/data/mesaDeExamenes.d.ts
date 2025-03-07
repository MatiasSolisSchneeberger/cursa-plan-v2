export interface mesaDeExamenes {
    examenes: examen[];
}

interface Examen {
    asignatura: string;
    turnos: turno[];
}

interface Turno {
    fecha: string;
}