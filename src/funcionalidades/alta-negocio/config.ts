import { DatosAltaNegocio } from './types';

export const pasosAltaNegocio = [
  {
    etiqueta: 'Datos del negocio',
    titulo: 'Configura tu negocio',
    descripcion:
      'Agrega la información básica que utilizaremos para identificar tu negocio dentro de PIK.',
  },
  {
    etiqueta: 'Ubicación y horario',
    titulo: 'Ubicación y horarios',
    descripcion:
      'Indica dónde se encuentra el negocio y cuándo puede recibir clientes.',
  },
  {
    etiqueta: 'Servicios',
    titulo: 'Servicios',
    descripcion: 'Ahora agregaremos los servicios que ofrece el negocio.',
  },
  {
    etiqueta: 'Personal',
    titulo: 'Personal',
    descripcion:
      'Agrega al personal y asigna los servicios que puede atender.',
  },
  {
    etiqueta: 'Resumen',
    titulo: 'Resumen y confirmación',
    descripcion: 'Revisa la información antes de confirmar el alta.',
  },
] as const;

export const datosInicialesAltaNegocio: DatosAltaNegocio = {
  datosNegocio: {
    nombre: '',
    categoria: '',
    telefono: '',
  },
  direccion: {
    calleNumero: '',
    colonia: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
  },
  horarios: [
    {
      dia: 'lunes',
      abierto: true,
      horaApertura: '09:00',
      horaCierre: '19:00',
    },
    {
      dia: 'martes',
      abierto: true,
      horaApertura: '09:00',
      horaCierre: '19:00',
    },
    {
      dia: 'miercoles',
      abierto: true,
      horaApertura: '09:00',
      horaCierre: '19:00',
    },
    {
      dia: 'jueves',
      abierto: true,
      horaApertura: '09:00',
      horaCierre: '19:00',
    },
    {
      dia: 'viernes',
      abierto: true,
      horaApertura: '09:00',
      horaCierre: '19:00',
    },
    {
      dia: 'sabado',
      abierto: true,
      horaApertura: '10:00',
      horaCierre: '16:00',
    },
    {
      dia: 'domingo',
      abierto: false,
      horaApertura: '10:00',
      horaCierre: '16:00',
    },
  ],
  servicios: [],
  personal: [],
};
