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

export interface Servicio {
  id: string;
  nombre: string;
  duracionMinutos: number;
  precio: number;
}

export interface MiembroPersonal {
  id: string;
  nombre: string;
  idsServicios: string[];
}

export interface DatosAltaNegocio {
  datosNegocio: DatosNegocio;
  direccion: DireccionNegocio;
  horarios: HorarioAtencion[];
  servicios: Servicio[];
  personal: MiembroPersonal[];
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

export interface ErroresServicio {
  nombre?: string;
  duracionMinutos?: string;
  precio?: string;
}

export interface ErroresMiembroPersonal {
  nombre?: string;
  servicios?: string;
}
