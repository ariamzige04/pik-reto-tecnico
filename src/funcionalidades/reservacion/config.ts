import { DatosReservacion } from './types';

export const pasosReservacion = [
  {
    etiqueta: 'Perfil del negocio',
    titulo: '',
    descripcion: '',
  },
  {
    etiqueta: 'Servicio',
    titulo: 'Elige un servicio',
    descripcion: 'Selecciona el servicio que deseas reservar.',
  },
  {
    etiqueta: 'Profesional',
    titulo: 'Elige quién te atiende',
    descripcion: 'Estas personas pueden realizar el servicio seleccionado.',
  },
  {
    etiqueta: 'Fecha y hora',
    titulo: 'Elige fecha y hora',
    descripcion: 'Los horarios ocupados aparecen deshabilitados.',
  },
  {
    etiqueta: 'Resumen',
    titulo: 'Confirma tu cita',
    descripcion: 'Revisa los detalles antes de confirmar la reservación.',
  },
] as const;

export const datosInicialesReservacion: DatosReservacion = {
  idServicio: '',
  idProfesional: '',
  fecha: '',
  hora: '',
};
