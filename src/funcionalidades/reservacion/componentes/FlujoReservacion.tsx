'use client';

import Link from 'next/link';
import { useState } from 'react';
import { negocioReservableMock } from '../mocks';
import { DatosReservacion } from '../tipos';
import { PerfilNegocio } from './PerfilNegocio';
import { ResumenReservacion } from './ResumenReservacion';
import { SeleccionFechaHora } from './SeleccionFechaHora';
import { SeleccionProfesional } from './SeleccionProfesional';
import { SeleccionServicio } from './SeleccionServicio';

const datosIniciales: DatosReservacion = {
  idServicio: '',
  idProfesional: '',
  fecha: '',
  hora: '',
};

const titulosPaso: Record<number, string> = {
  1: 'Perfil del negocio',
  2: 'Servicio',
  3: 'Profesional',
  4: 'Fecha y hora',
  5: 'Resumen',
};

const encabezadosPaso: Record<number, string> = {
  2: 'Elige un servicio',
  3: 'Elige quién te atiende',
  4: 'Elige fecha y hora',
  5: 'Confirma tu cita',
};

const descripcionesPaso: Record<number, string> = {
  2: 'Selecciona el servicio que deseas reservar.',
  3: 'Estas personas pueden realizar el servicio seleccionado.',
  4: 'Los horarios ocupados aparecen deshabilitados.',
  5: 'Revisa los detalles antes de confirmar la reservación.',
};

/** coordina el flujo y conserva las selecciones al regresar */
export function FlujoReservacion() {
  const [pasoActual, setPasoActual] = useState(1);
  const [datos, setDatos] = useState<DatosReservacion>(datosIniciales);
  const servicioSeleccionado = negocioReservableMock.servicios.find(
    (servicio) => servicio.id === datos.idServicio
  );
  const profesionalesDisponibles = negocioReservableMock.profesionales.filter(
    (profesional) => profesional.idsServicios.includes(datos.idServicio)
  );
  const profesionalSeleccionado = negocioReservableMock.profesionales.find(
    (profesional) => profesional.id === datos.idProfesional
  );

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
          onClick={() => setPasoActual((paso) => paso - 1)}
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
            style={{ width: `${pasoActual * 20}%` }}
          />
        </div>

        {pasoActual > 1 && (
          <header className="mt-8">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
              {encabezadosPaso[pasoActual]}
            </h1>
            <p className="mt-3 leading-7 text-zinc-600">
              {descripcionesPaso[pasoActual]}
            </p>
          </header>
        )}

        {pasoActual === 1 && (
          <PerfilNegocio
            negocio={negocioReservableMock}
            alReservar={() => setPasoActual(2)}
          />
        )}

        {pasoActual === 2 && (
          <SeleccionServicio
            servicios={negocioReservableMock.servicios}
            idSeleccionado={datos.idServicio}
            alSeleccionar={(idServicio) =>
              setDatos({
                idServicio,
                idProfesional: '',
                fecha: '',
                hora: '',
              })
            }
            alRegresar={() => setPasoActual(1)}
            alContinuar={() => setPasoActual(3)}
          />
        )}

        {pasoActual === 3 && servicioSeleccionado && (
          <SeleccionProfesional
            profesionales={profesionalesDisponibles}
            idSeleccionado={datos.idProfesional}
            alSeleccionar={(idProfesional) =>
              setDatos((actual) => ({
                ...actual,
                idProfesional,
                fecha: '',
                hora: '',
              }))
            }
            alRegresar={() => setPasoActual(2)}
            alContinuar={() => setPasoActual(4)}
          />
        )}

        {pasoActual === 4 && profesionalSeleccionado && (
          <SeleccionFechaHora
            idProfesional={profesionalSeleccionado.id}
            fechaSeleccionada={datos.fecha}
            horaSeleccionada={datos.hora}
            alSeleccionarFecha={(fecha) =>
              setDatos((actual) => ({
                ...actual,
                fecha,
                hora: '',
              }))
            }
            alSeleccionarHora={(hora) =>
              setDatos((actual) => ({ ...actual, hora }))
            }
            alRegresar={() => setPasoActual(3)}
            alContinuar={() => setPasoActual(5)}
          />
        )}

        {pasoActual === 5 &&
          servicioSeleccionado &&
          profesionalSeleccionado && (
            <ResumenReservacion
              negocio={negocioReservableMock}
              servicio={servicioSeleccionado}
              profesional={profesionalSeleccionado}
              fecha={datos.fecha}
              hora={datos.hora}
              alRegresar={() => setPasoActual(4)}
            />
          )}
      </section>
    </main>
  );
}
