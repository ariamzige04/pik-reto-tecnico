import { NegocioReservable } from './types';

export const negocioReservableMock: NegocioReservable = {
  nombre: 'Studio Nova',
  categoria: 'Salón de belleza',
  descripcion:
    'Servicios de belleza y bienestar en un espacio cómodo y profesional.',
  direccion: 'Av. Vasconcelos 1200, Del Valle, Monterrey, Nuevo León',
  telefono: '81 1234 5678',
  horarioResumen: 'Lunes a sábado, 9:00 a 19:00',
  calificacion: 4.9,
  totalResenas: 128,
  servicios: [
    {
      id: 'corte-peinado',
      nombre: 'Corte y peinado',
      descripcion: 'Corte personalizado, lavado y peinado final.',
      duracionMinutos: 60,
      precio: 550,
    },
    {
      id: 'manicure-gel',
      nombre: 'Manicure gel',
      descripcion: 'Limpieza, cuidado de uñas y aplicación de gel.',
      duracionMinutos: 45,
      precio: 420,
    },
    {
      id: 'tratamiento-capilar',
      nombre: 'Tratamiento capilar',
      descripcion: 'Hidratación profunda según las necesidades del cabello.',
      duracionMinutos: 75,
      precio: 680,
    },
  ],
  profesionales: [
    {
      id: 'daniela-ruiz',
      nombre: 'Daniela Ruiz',
      especialidad: 'Estilista',
      idsServicios: ['corte-peinado', 'tratamiento-capilar'],
    },
    {
      id: 'carla-mendez',
      nombre: 'Carla Méndez',
      especialidad: 'Especialista en uñas',
      idsServicios: ['manicure-gel'],
    },
    {
      id: 'sofia-garcia',
      nombre: 'Sofía García',
      especialidad: 'Estilista integral',
      idsServicios: [
        'corte-peinado',
        'manicure-gel',
        'tratamiento-capilar',
      ],
    },
  ],
};

export const horasDisponiblesMock = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
];

// combina el profesional y la posicion de la fecha para simular reservas
const horasOcupadasMock: Record<string, string[]> = {
  'daniela-ruiz-0': ['10:00', '12:00', '16:00'],
  'daniela-ruiz-1': ['09:00', '15:00'],
  'daniela-ruiz-2': ['11:00', '17:00'],
  'carla-mendez-0': ['11:00', '13:00'],
  'carla-mendez-1': ['10:00', '16:00', '18:00'],
  'carla-mendez-2': ['12:00', '15:00'],
  'sofia-garcia-0': ['09:00', '12:00', '17:00'],
  'sofia-garcia-1': ['11:00', '15:00'],
  'sofia-garcia-2': ['10:00', '13:00', '18:00'],
};

export function obtenerHorasOcupadas(
  idProfesional: string,
  indiceFecha: number
) {
  const posicionRepetible = indiceFecha % 3;
  return horasOcupadasMock[`${idProfesional}-${posicionRepetible}`] ?? [];
}
