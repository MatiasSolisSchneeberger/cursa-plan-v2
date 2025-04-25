export interface carreras {
    carreras: Carrera[];
}

interface Carrera {
    carrera: string;
    emoji: string;
    cursada: Cursada[];
}

interface Cursada {
    año: number;
    materias: Materia[] | null;
    orientaciones?: Orientacion[] | null;
    guidelines?: Guide;
}

interface Materia {
    materia: string;
    codigo?: number;
    paraCursar: Condicion[] | null;
    paraRendir: Condicion[] | null;
    planDeEstudio: string | null;
}

interface Orientacion {
    nombre: string;
    materias: Materia[];
}

interface Guide {
    hola: string;
}

interface Condicion {
    mat: string;
    cond: "R" | "A" | null; // "R" = Regular, "A" = Aprobada
}