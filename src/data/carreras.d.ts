export interface carreras {
    carreras: Array<Carrera>;
}

interface Carrera {
    carrera: string;
    emoji: string;
    cursada: Array<Cursada>;
}

interface Cursada {
    año: number;
    materias?: Array<Materia>;
    orientaciones?: Array<Orientacion>;
}

interface Materia {
    materia: string;
    codigo: number;
    paraCursar: Array<Condicion> | null;
    paraRendir: Array<Condicion> | null;
    planDeEstudio: string | null;
    mesas: Array<Mesa> | null;
}

export interface Orientacion {
    nombre: string;
    materias: Array<Materia>;
}

interface Condicion {
    mat: string
    cond: "R" | "A" | null, // "R" = Regular, "A" = Aprobada
}

interface Mesa {
    fecha: Date;
}