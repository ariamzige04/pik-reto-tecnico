'use client';

import { FormEvent, useState } from 'react';
import { StepActions } from '@/shared/components/StepActions';
import { ServicioReservable } from '../types';

interface SeleccionServicioProps {
  servicios: ServicioReservable[];
  idSeleccionado: string;
  alSeleccionar: (idServicio: string) => void;
  alRegresar: () => void;
  alContinuar: () => void;
}

const formatoPrecio = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

/** permite elegir un servicio antes de seleccionar al profesional */
export function SeleccionServicio({
  servicios,
  idSeleccionado,
  alSeleccionar,
  alRegresar,
  alContinuar,
}: SeleccionServicioProps) {
  const [error, setError] = useState('');

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!idSeleccionado) {
      setError('Selecciona un servicio para continuar.');
      return;
    }

    setError('');
    alContinuar();
  }

  return (
    <form onSubmit={manejarEnvio} className="mt-8">
      <fieldset aria-describedby={error ? 'error-servicio' : undefined}>
        <legend className="sr-only">Selecciona un servicio</legend>
        <div className="space-y-3">
          {servicios.map((servicio) => {
            const seleccionado = idSeleccionado === servicio.id;

            return (
              <label
                key={servicio.id}
                className={`block cursor-pointer rounded-2xl border p-4 transition sm:p-5 ${
                  seleccionado
                    ? 'border-zinc-950 bg-zinc-50 ring-1 ring-zinc-950'
                    : 'border-zinc-200 bg-white hover:border-zinc-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="servicio"
                    value={servicio.id}
                    checked={seleccionado}
                    onChange={() => {
                      alSeleccionar(servicio.id);
                      setError('');
                    }}
                    className="mt-1 h-5 w-5 shrink-0"
                  />
                  <span className="flex-1">
                    <span className="flex items-start justify-between gap-4">
                      <span className="font-semibold text-zinc-950">
                        {servicio.nombre}
                      </span>
                      <span className="shrink-0 font-medium text-zinc-950">
                        {formatoPrecio.format(servicio.precio)}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-zinc-600">
                      {servicio.descripcion}
                    </span>
                    <span className="mt-2 block text-sm text-zinc-500">
                      {servicio.duracionMinutos} minutos
                    </span>
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <p id="error-servicio" className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <StepActions alRegresar={alRegresar} tipoPrincipal="submit" />
    </form>
  );
}
