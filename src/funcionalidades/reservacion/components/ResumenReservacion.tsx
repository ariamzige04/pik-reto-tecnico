'use client';

import Link from 'next/link';
import { useState } from 'react';
import { StepActions } from '@/shared/components/StepActions';
import {
  NegocioReservable,
  ProfesionalDisponible,
  ServicioReservable,
} from '../types';

interface ResumenReservacionProps {
  negocio: NegocioReservable;
  servicio: ServicioReservable;
  profesional: ProfesionalDisponible;
  fecha: string;
  hora: string;
  alRegresar: () => void;
}

const formatoPrecio = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

function formatearFecha(fecha: string) {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${fecha}T12:00:00`));
}

/** resume la cita y simula su confirmacion sin servicios externos */
export function ResumenReservacion({
  negocio,
  servicio,
  profesional,
  fecha,
  hora,
  alRegresar,
}: ResumenReservacionProps) {
  const [confirmada, setConfirmada] = useState(false);

  if (confirmada) {
    return (
      <section
        className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8"
        role="status"
        aria-live="polite"
      >
        <div
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-2xl font-bold text-white"
          aria-hidden="true"
        >
          ✓
        </div>
        <h2 className="mt-5 text-2xl font-bold text-zinc-950">
          Cita confirmada
        </h2>
        <p className="mt-3 leading-7 text-zinc-600">
          Te esperamos en {negocio.nombre} el {formatearFecha(fecha)} a las{' '}
          {hora}.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-zinc-950 px-6 font-medium text-white hover:bg-zinc-800 sm:w-auto"
        >
          Volver al inicio
        </Link>
      </section>
    );
  }

  return (
    <div className="mt-8">
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-zinc-950">
          Detalles de la cita
        </h2>
        <dl className="mt-5 space-y-4">
          <div className="border-b border-zinc-100 pb-4">
            <dt className="text-sm text-zinc-500">Negocio</dt>
            <dd className="mt-1 font-medium text-zinc-950">
              {negocio.nombre}
            </dd>
            <dd className="mt-1 text-sm text-zinc-600">
              {negocio.direccion}
            </dd>
          </div>
          <div className="border-b border-zinc-100 pb-4">
            <dt className="text-sm text-zinc-500">Servicio</dt>
            <dd className="mt-1 flex items-start justify-between gap-4 font-medium text-zinc-950">
              <span>{servicio.nombre}</span>
              <span>{formatoPrecio.format(servicio.precio)}</span>
            </dd>
            <dd className="mt-1 text-sm text-zinc-600">
              {servicio.duracionMinutos} minutos
            </dd>
          </div>
          <div className="border-b border-zinc-100 pb-4">
            <dt className="text-sm text-zinc-500">Te atiende</dt>
            <dd className="mt-1 font-medium text-zinc-950">
              {profesional.nombre}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500">Fecha y hora</dt>
            <dd className="mt-1 font-medium capitalize text-zinc-950">
              {formatearFecha(fecha)} · {hora}
            </dd>
          </div>
        </dl>
      </section>

      <StepActions
        alRegresar={alRegresar}
        alAccionPrincipal={() => setConfirmada(true)}
        textoPrincipal="Confirmar cita"
      />
    </div>
  );
}
