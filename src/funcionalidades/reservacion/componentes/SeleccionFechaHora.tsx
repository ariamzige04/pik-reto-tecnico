'use client';

import { FormEvent, useState } from 'react';
import { horasDisponiblesMock, obtenerHorasOcupadas } from '../mocks';
import { FechaDisponible } from '../tipos';

interface PropiedadesSeleccionFechaHora {
  idProfesional: string;
  fechaSeleccionada: string;
  horaSeleccionada: string;
  alSeleccionarFecha: (fecha: string) => void;
  alSeleccionarHora: (hora: string) => void;
  alRegresar: () => void;
  alContinuar: () => void;
}

function generarFechasDisponibles(): FechaDisponible[] {
  const fechas: FechaDisponible[] = [];
  const fecha = new Date();
  fecha.setHours(12, 0, 0, 0);

  // genera siete dias de atencion y omite los domingos cerrados
  while (fechas.length < 7) {
    fecha.setDate(fecha.getDate() + 1);

    if (fecha.getDay() === 0) {
      continue;
    }

    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    fechas.push({
      valor: `${anio}-${mes}-${dia}`,
      diaSemana: new Intl.DateTimeFormat('es-MX', {
        weekday: 'short',
      }).format(fecha),
      diaMes: String(fecha.getDate()),
      mes: new Intl.DateTimeFormat('es-MX', { month: 'short' }).format(fecha),
    });
  }

  return fechas;
}

/** permite elegir una fecha y bloquea los horarios ocupados */
export function SeleccionFechaHora({
  idProfesional,
  fechaSeleccionada,
  horaSeleccionada,
  alSeleccionarFecha,
  alSeleccionarHora,
  alRegresar,
  alContinuar,
}: PropiedadesSeleccionFechaHora) {
  const [fechas] = useState(generarFechasDisponibles);
  const [error, setError] = useState('');
  const indiceFecha = fechas.findIndex(
    (fecha) => fecha.valor === fechaSeleccionada
  );
  const horasOcupadas =
    indiceFecha >= 0
      ? obtenerHorasOcupadas(idProfesional, indiceFecha)
      : [];

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!fechaSeleccionada || !horaSeleccionada) {
      setError('Selecciona una fecha y una hora disponibles.');
      return;
    }

    setError('');
    alContinuar();
  }

  return (
    <form onSubmit={manejarEnvio} className="mt-8">
      <fieldset>
        <legend className="font-semibold text-zinc-950">Fecha</legend>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-7">
          {fechas.map((fecha) => {
            const seleccionada = fechaSeleccionada === fecha.valor;

            return (
              <button
                key={fecha.valor}
                type="button"
                aria-pressed={seleccionada}
                onClick={() => {
                  alSeleccionarFecha(fecha.valor);
                  setError('');
                }}
                className={`min-h-20 rounded-xl border px-2 py-3 text-center transition ${
                  seleccionada
                    ? 'border-zinc-950 bg-zinc-950 text-white'
                    : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400'
                }`}
              >
                <span className="block text-xs capitalize opacity-70">
                  {fecha.diaSemana}
                </span>
                <span className="mt-1 block text-lg font-semibold">
                  {fecha.diaMes}
                </span>
                <span className="block text-xs capitalize opacity-70">
                  {fecha.mes}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-8" disabled={!fechaSeleccionada}>
        <legend className="font-semibold text-zinc-950">Hora</legend>
        {!fechaSeleccionada && (
          <p className="mt-2 text-sm text-zinc-500">
            Primero selecciona una fecha.
          </p>
        )}
        {fechaSeleccionada && (
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {horasDisponiblesMock.map((hora) => {
              const ocupada = horasOcupadas.includes(hora);
              const seleccionada = horaSeleccionada === hora;

              return (
                <button
                  key={hora}
                  type="button"
                  disabled={ocupada}
                  aria-pressed={seleccionada}
                  aria-label={ocupada ? `${hora}, ocupado` : hora}
                  onClick={() => {
                    alSeleccionarHora(hora);
                    setError('');
                  }}
                  className={`min-h-12 rounded-xl border px-3 text-sm font-medium transition ${
                    ocupada
                      ? 'cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400 line-through'
                      : seleccionada
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400'
                  }`}
                >
                  {hora}
                </button>
              );
            })}
          </div>
        )}
      </fieldset>

      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
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
