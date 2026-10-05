'use client';

import { FormEvent, useState } from 'react';
import { ProfesionalDisponible } from '../tipos';

interface PropiedadesSeleccionProfesional {
  profesionales: ProfesionalDisponible[];
  idSeleccionado: string;
  alSeleccionar: (idProfesional: string) => void;
  alRegresar: () => void;
  alContinuar: () => void;
}

/** muestra solo al personal que puede realizar el servicio elegido */
export function SeleccionProfesional({
  profesionales,
  idSeleccionado,
  alSeleccionar,
  alRegresar,
  alContinuar,
}: PropiedadesSeleccionProfesional) {
  const [error, setError] = useState('');

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!idSeleccionado) {
      setError('Selecciona quién te atenderá.');
      return;
    }

    setError('');
    alContinuar();
  }

  return (
    <form onSubmit={manejarEnvio} className="mt-8">
      <fieldset aria-describedby={error ? 'error-profesional' : undefined}>
        <legend className="sr-only">Selecciona quién te atenderá</legend>
        <div className="space-y-3">
          {profesionales.map((profesional) => {
            const seleccionado = idSeleccionado === profesional.id;

            return (
              <label
                key={profesional.id}
                className={`flex min-h-20 cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
                  seleccionado
                    ? 'border-zinc-950 bg-zinc-50 ring-1 ring-zinc-950'
                    : 'border-zinc-200 bg-white hover:border-zinc-400'
                }`}
              >
                <input
                  type="radio"
                  name="profesional"
                  value={profesional.id}
                  checked={seleccionado}
                  onChange={() => {
                    alSeleccionar(profesional.id);
                    setError('');
                  }}
                  className="h-5 w-5 shrink-0"
                />
                <span>
                  <span className="block font-semibold text-zinc-950">
                    {profesional.nombre}
                  </span>
                  <span className="mt-1 block text-sm text-zinc-600">
                    {profesional.especialidad}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <p
          id="error-profesional"
          className="mt-4 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={alRegresar}
          className="min-h-12 rounded-xl border border-zinc-300 bg-white px-6 font-medium text-zinc-900 hover:bg-zinc-50"
        >
          Regresar
        </button>
        <button
          type="submit"
          className="min-h-12 rounded-xl bg-zinc-950 px-6 font-medium text-white hover:bg-zinc-800"
        >
          Continuar
        </button>
      </div>
    </form>
  );
}
