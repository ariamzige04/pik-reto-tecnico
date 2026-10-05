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

export interface ErroresDatosNegocio {
  nombre?: string;
  categoria?: string;
  telefono?: string;
}