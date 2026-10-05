'use client';

import { FormEvent, useState } from 'react';
import {
  DireccionNegocio,
  ErroresUbicacionHorario,
  HorarioAtencion,
} from '../tipos';
import { validarUbicacionHorario } from '../validaciones';

interface PropiedadesFormularioUbicacionHorario {
  direccion: DireccionNegocio;
  horarios: HorarioAtencion[];
  alCambiarDireccion: (direccion: DireccionNegocio) => void;
  alCambiarHorarios: (horarios: HorarioAtencion[]) => void;
  alRegresar: () => void;
  alContinuar: () => void;
}

const nombresDias: Record<HorarioAtencion['dia'], string> = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
  domingo: 'Domingo',
};

/** captura la direccion y los horarios semanales del negocio */
export function FormularioUbicacionHorario({
  direccion,
  horarios,
  alCambiarDireccion,
  alCambiarHorarios,
  alRegresar,
  alContinuar,
}: PropiedadesFormularioUbicacionHorario) {
  const [errores, setErrores] =
    useState<ErroresUbicacionHorario>({});

  function actualizarHorario(
    indice: number,
    cambios: Partial<HorarioAtencion>
  ) {
    const nuevosHorarios = horarios.map((horario, posicion) =>
      posicion === indice
        ? { ...horario, ...cambios }
        : horario
    );

    alCambiarHorarios(nuevosHorarios);
  }

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const nuevosErrores = validarUbicacionHorario(
      direccion,
      horarios
    );

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    alContinuar();
  }

  const camposDireccion: Array<{
    id: keyof DireccionNegocio;
    etiqueta: string;
    placeholder: string;
  }> = [
    {
      id: 'calleNumero',
      etiqueta: 'Calle y número',
      placeholder: 'Ej. Av. Vasconcelos 1200',
    },
    {
      id: 'colonia',
      etiqueta: 'Colonia',
      placeholder: 'Ej. Del Valle',
    },
    {
      id: 'ciudad',
      etiqueta: 'Ciudad',
      placeholder: 'Ej. Monterrey',
    },
    {
      id: 'estado',
      etiqueta: 'Estado',
      placeholder: 'Ej. Nuevo León',
    },
    {
      id: 'codigoPostal',
      etiqueta: 'Código postal',
      placeholder: 'Ej. 64000',
    },
  ];

  return (
    <form onSubmit={manejarEnvio} noValidate className="mt-8">
      <div className="space-y-5">
        {camposDireccion.map((campo) => (
          <div key={campo.id}>
            <label
              htmlFor={campo.id}
              className="block text-sm font-medium text-zinc-900"
            >
              {campo.etiqueta}
            </label>

            <input
              id={campo.id}
              type="text"
              value={direccion[campo.id]}
              placeholder={campo.placeholder}
              inputMode={
                campo.id === 'codigoPostal'
                  ? 'numeric'
                  : undefined
              }
              aria-invalid={Boolean(errores[campo.id])}
              onChange={(evento) =>
                alCambiarDireccion({
                  ...direccion,
                  [campo.id]: evento.target.value,
                })
              }
              className="mt-2 min-h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
            />

            {errores[campo.id] && (
              <p className="mt-2 text-sm text-red-600">
                {errores[campo.id]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-zinc-950">
          Horario de atención
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Selecciona los días que abre el negocio y define su horario.
        </p>

        <div className="mt-5 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
          {horarios.map((horario, indice) => (
            <div
              key={horario.dia}
              className="p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-3 font-medium text-zinc-900">
                  <input
                    type="checkbox"
                    checked={horario.abierto}
                    onChange={(evento) =>
                      actualizarHorario(indice, {
                        abierto: evento.target.checked,
                      })
                    }
                    className="h-5 w-5"
                  />

                  {nombresDias[horario.dia]}
                </label>

                <span className="text-sm text-zinc-500">
                  {horario.abierto ? 'Abierto' : 'Cerrado'}
                </span>
              </div>

              {horario.abierto && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor={`${horario.dia}-apertura`}
                      className="text-xs font-medium text-zinc-600"
                    >
                      Apertura
                    </label>

                    <input
                      id={`${horario.dia}-apertura`}
                      type="time"
                      value={horario.horaApertura}
                      onChange={(evento) =>
                        actualizarHorario(indice, {
                          horaApertura: evento.target.value,
                        })
                      }
                      className="mt-1 min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={`${horario.dia}-cierre`}
                      className="text-xs font-medium text-zinc-600"
                    >
                      Cierre
                    </label>

                    <input
                      id={`${horario.dia}-cierre`}
                      type="time"
                      value={horario.horaCierre}
                      onChange={(evento) =>
                        actualizarHorario(indice, {
                          horaCierre: evento.target.value,
                        })
                      }
                      className="mt-1 min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {errores.horarios && (
          <p className="mt-3 text-sm text-red-600">
            {errores.horarios}
          </p>
        )}
      </div>

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
