'use client';

import Link from 'next/link';
import { useState } from 'react';
import { StepHeader } from '@/shared/components/StepHeader';
import { useStepFocus } from '@/shared/hooks/useStepFocus';
import {
  datosInicialesReservacion,
  pasosReservacion,
} from '../config';
import { negocioReservableMock } from '../mocks';
import { PerfilNegocio } from './PerfilNegocio';
import { ResumenReservacion } from './ResumenReservacion';
import { SeleccionFechaHora } from './SeleccionFechaHora';
import { SeleccionProfesional } from './SeleccionProfesional';
import { SeleccionServicio } from './SeleccionServicio';

/** coordina el flujo y conserva las selecciones al regresar */
export function FlujoReservacion() {
  const [pasoActual, setPasoActual] = useState(1);
  const [datos, setDatos] = useState(datosInicialesReservacion);
  const contenedorFlujoRef = useStepFocus(pasoActual);
  const configuracionPaso = pasosReservacion[pasoActual - 1];

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
          onClick={() => setPasoActual((paso) => paso - 1)}
          className="inline-flex min-h-11 items-center text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
        >
          ← Regresar
        </button>
      )}

      <section className="mt-6">
        <StepHeader
          pasoActual={pasoActual}
          totalPasos={pasosReservacion.length}
          etiqueta={configuracionPaso.etiqueta}
        />

        {pasoActual > 1 && (
          <header className="mt-8">
            <h1
              tabIndex={-1}
              className="text-3xl font-bold tracking-tight text-zinc-950 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
            >
              {configuracionPaso.titulo}
            </h1>
            <p className="mt-3 leading-7 text-zinc-600">
              {configuracionPaso.descripcion}
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
