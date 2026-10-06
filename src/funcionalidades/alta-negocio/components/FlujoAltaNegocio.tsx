'use client';

import Link from 'next/link';
import { useState } from 'react';
import { StepHeader } from '@/shared/components/StepHeader';
import { useStepFocus } from '@/shared/hooks/useStepFocus';
import { FormularioDatosNegocio } from './FormularioDatosNegocio';
import { FormularioPersonal } from './FormularioPersonal';
import { FormularioServicios } from './FormularioServicios';
import { FormularioUbicacionHorario } from './FormularioUbicacionHorario';
import { ResumenAltaNegocio } from './ResumenAltaNegocio';
import {
  DatosAltaNegocio,
  HorarioAtencion,
} from '../types';

const horariosIniciales: HorarioAtencion[] = [
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
];

const datosIniciales: DatosAltaNegocio = {
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
  horarios: horariosIniciales,
  servicios: [],
  personal: [],
};

/** coordina los pasos y conserva los datos mientras el usuario navega */
export function FlujoAltaNegocio() {
  const [pasoActual, setPasoActual] = useState(1);
  const [datosAlta, setDatosAlta] =
    useState<DatosAltaNegocio>(datosIniciales);
  const contenedorFlujoRef = useStepFocus(pasoActual);

  const titulosPaso: Record<number, string> = {
    1: 'Datos del negocio',
    2: 'Ubicación y horario',
    3: 'Servicios',
    4: 'Personal',
    5: 'Resumen',
  };

  return (
    <main
      ref={contenedorFlujoRef}
      className="mx-auto min-h-screen w-full max-w-2xl px-4 py-6 sm:py-10"
    >
      {pasoActual === 1 ? (
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
        >
          ← Volver
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => setPasoActual(pasoActual - 1)}
          className="inline-flex min-h-11 items-center text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
        >
          ← Regresar
        </button>
      )}

      <section className="mt-6">
        <StepHeader
          pasoActual={pasoActual}
          totalPasos={5}
          etiqueta={titulosPaso[pasoActual]}
        />

        <div className="mt-8">
          <h1
            tabIndex={-1}
            className="text-3xl font-bold tracking-tight text-zinc-950 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
          >
            {pasoActual === 1 && 'Configura tu negocio'}
            {pasoActual === 2 && 'Ubicación y horarios'}
            {pasoActual === 3 && 'Servicios'}
            {pasoActual === 4 && 'Personal'}
            {pasoActual === 5 && 'Resumen y confirmación'}
          </h1>

          <p className="mt-3 leading-7 text-zinc-600">
            {pasoActual === 1 &&
              'Agrega la información básica que utilizaremos para identificar tu negocio dentro de PIK.'}

            {pasoActual === 2 &&
              'Indica dónde se encuentra el negocio y cuándo puede recibir clientes.'}

            {pasoActual === 3 &&
              'Ahora agregaremos los servicios que ofrece el negocio.'}

            {pasoActual === 4 &&
              'Agrega al personal y asigna los servicios que puede atender.'}

            {pasoActual === 5 &&
              'Revisa la información antes de confirmar el alta.'}
          </p>
        </div>

        {pasoActual === 1 && (
          <FormularioDatosNegocio
            datos={datosAlta.datosNegocio}
            alCambiar={(datosNegocio) =>
              setDatosAlta((actual) => ({
                ...actual,
                datosNegocio,
              }))
            }
            alContinuar={() => setPasoActual(2)}
          />
        )}

        {pasoActual === 2 && (
          <FormularioUbicacionHorario
            direccion={datosAlta.direccion}
            horarios={datosAlta.horarios}
            alCambiarDireccion={(direccion) =>
              setDatosAlta((actual) => ({
                ...actual,
                direccion,
              }))
            }
            alCambiarHorarios={(horarios) =>
              setDatosAlta((actual) => ({
                ...actual,
                horarios,
              }))
            }
            alRegresar={() => setPasoActual(1)}
            alContinuar={() => setPasoActual(3)}
          />
        )}

        {pasoActual === 3 && (
          <FormularioServicios
            servicios={datosAlta.servicios}
            alCambiar={(servicios) =>
              setDatosAlta((actual) => ({
                ...actual,
                servicios,
                // elimina asignaciones que dejaron de existir en el catalogo
                personal: actual.personal.map((miembro) => ({
                  ...miembro,
                  idsServicios: miembro.idsServicios.filter((idServicio) =>
                    servicios.some((servicio) => servicio.id === idServicio)
                  ),
                })),
              }))
            }
            alRegresar={() => setPasoActual(2)}
            alContinuar={() => setPasoActual(4)}
          />
        )}

        {pasoActual === 4 && (
          <FormularioPersonal
            personal={datosAlta.personal}
            servicios={datosAlta.servicios}
            alCambiar={(personal) =>
              setDatosAlta((actual) => ({
                ...actual,
                personal,
              }))
            }
            alRegresar={() => setPasoActual(3)}
            alContinuar={() => setPasoActual(5)}
          />
        )}

        {pasoActual === 5 && (
          <ResumenAltaNegocio
            datos={datosAlta}
            alRegresar={() => setPasoActual(4)}
          />
        )}
      </section>
    </main>
  );
}
