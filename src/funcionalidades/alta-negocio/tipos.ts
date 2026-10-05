export type CategoriaNegocio =
  | 'salon'
  | 'barberia'
  | 'spa'
  | 'unas';

export interface DatosNegocio {
  nombre: string;
  categoria: CategoriaNegocio | '';
  telefono: string;
}

export interface DireccionNegocio {
  calleNumero: string;
  colonia: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
}

export type DiaSemana =
  | 'lunes'
  | 'martes'
  | 'miercoles'
  | 'jueves'
  | 'viernes'
  | 'sabado'
  | 'domingo';

export interface HorarioAtencion {
  dia: DiaSemana;
  abierto: boolean;
  horaApertura: string;
  horaCierre: string;
}

export interface DatosAltaNegocio {
  datosNegocio: DatosNegocio;
  direccion: DireccionNegocio;
  horarios: HorarioAtencion[];
}

export interface ErroresDatosNegocio {
  nombre?: string;
  categoria?: string;
  telefono?: string;
}

export interface ErroresUbicacionHorario {
  calleNumero?: string;
  colonia?: string;
  ciudad?: string;
  estado?: string;
  codigoPostal?: string;
  horarios?: string;
}