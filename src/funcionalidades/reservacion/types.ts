export interface ServicioReservable {
  id: string;
  nombre: string;
  descripcion: string;
  duracionMinutos: number;
  precio: number;
}

export interface ProfesionalDisponible {
  id: string;
  nombre: string;
  especialidad: string;
  idsServicios: string[];
}

export interface NegocioReservable {
  nombre: string;
  categoria: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  horarioResumen: string;
  calificacion: number;
  totalResenas: number;
  servicios: ServicioReservable[];
  profesionales: ProfesionalDisponible[];
}

export interface DatosReservacion {
  idServicio: string;
  idProfesional: string;
  fecha: string;
  hora: string;
}

export interface FechaDisponible {
  valor: string;
  diaSemana: string;
  diaMes: string;
  mes: string;
}
