'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FormularioDatosNegocio } from './FormularioDatosNegocio';
import { FormularioServicios } from './FormularioServicios';
import { FormularioUbicacionHorario } from './FormularioUbicacionHorario';
import {
  DatosAltaNegocio,
  HorarioAtencion,
} from '../tipos';

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
};

export function FlujoAltaNegocio() {
  const [pasoActual, setPasoActual] = useState(1);
  const [datosAlta, setDatosAlta] =
    useState<DatosAltaNegocio>(datosIniciales);

  const titulosPaso: Record<number, string> = {
    1: 'Datos del negocio',
    2: 'Ubicación y horario',
    3: 'Servicios',
    4: 'Personal',
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-6 sm:py-10">
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
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-zinc-600">
            Paso {pasoActual} de 5
          </p>

          <span className="text-sm text-zinc-500">
            {titulosPaso[pasoActual]}
          </span>
        </div>

        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-zinc-950 transition-all"
            style={{
              width: `${pasoActual * 20}%`,
            }}
          />
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
            {pasoActual === 1 && 'Configura tu negocio'}
            {pasoActual === 2 && 'Ubicación y horarios'}
            {pasoActual === 3 && 'Servicios'}
            {pasoActual === 4 && 'Personal'}
          </h1>

          <p className="mt-3 leading-7 text-zinc-600">
            {pasoActual === 1 &&
              'Agrega la información básica que utilizaremos para identificar tu negocio dentro de PIK.'}

            {pasoActual === 2 &&
              'Indica dónde se encuentra el negocio y cuándo puede recibir clientes.'}

            {pasoActual === 3 &&
              'Ahora agregaremos los servicios que ofrece el negocio.'}

            {pasoActual === 4 &&
              'El siguiente paso permitirá agregar al personal del negocio.'}
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
              }))
            }
            alRegresar={() => setPasoActual(2)}
            alContinuar={() => setPasoActual(4)}
          />
        )}

        {pasoActual === 4 && (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-zinc-600">
              El formulario de personal se implementará en el siguiente paso.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
