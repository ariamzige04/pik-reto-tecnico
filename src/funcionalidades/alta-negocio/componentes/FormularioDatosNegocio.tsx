'use client';

import { FormEvent, useState } from 'react';
import {
  DatosNegocio,
  ErroresDatosNegocio,
} from '../tipos';
import { validarDatosNegocio } from '../validaciones';

interface PropiedadesFormularioDatosNegocio {
  datos: DatosNegocio;
  alCambiar: (datos: DatosNegocio) => void;
  alContinuar: () => void;
}

/** captura y valida la informacion basica del negocio */
export function FormularioDatosNegocio({
  datos,
  alCambiar,
  alContinuar,
}: PropiedadesFormularioDatosNegocio) {
  const [errores, setErrores] = useState<ErroresDatosNegocio>({});

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const nuevosErrores = validarDatosNegocio(datos);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    alContinuar();
  }

  return (
    <form onSubmit={manejarEnvio} noValidate className="mt-8 space-y-6">
      <div>
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-zinc-900"
        >
          Nombre del negocio
        </label>

        <input
          id="nombre"
          type="text"
          autoComplete="organization"
          placeholder="Ej. Studio Nova"
          value={datos.nombre}
          aria-invalid={Boolean(errores.nombre)}
          aria-describedby={errores.nombre ? 'error-nombre' : undefined}
          onChange={(evento) =>
            alCambiar({
              ...datos,
              nombre: evento.target.value,
            })
          }
          className="mt-2 min-h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />

        {errores.nombre && (
          <p id="error-nombre" className="mt-2 text-sm text-red-600">
            {errores.nombre}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="categoria"
          className="block text-sm font-medium text-zinc-900"
        >
          Categoría
        </label>

        <select
          id="categoria"
          value={datos.categoria}
          aria-invalid={Boolean(errores.categoria)}
          onChange={(evento) =>
            alCambiar({
              ...datos,
              categoria: evento.target.value as DatosNegocio['categoria'],
            })
          }
          className="mt-2 min-h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        >
          <option value="">Selecciona una categoría</option>
          <option value="salon">Salón de belleza</option>
          <option value="barberia">Barbería</option>
          <option value="spa">Spa</option>
          <option value="unas">Estudio de uñas</option>
        </select>

        {errores.categoria && (
          <p className="mt-2 text-sm text-red-600">
            {errores.categoria}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="telefono"
          className="block text-sm font-medium text-zinc-900"
        >
          Teléfono de contacto
        </label>

        <input
          id="telefono"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="81 1234 5678"
          value={datos.telefono}
          aria-invalid={Boolean(errores.telefono)}
          onChange={(evento) =>
            alCambiar({
              ...datos,
              telefono: evento.target.value,
            })
          }
          className="mt-2 min-h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
        />

        {errores.telefono && (
          <p className="mt-2 text-sm text-red-600">
            {errores.telefono}
          </p>
        )}
      </div>

      <div className="flex justify-end border-t border-zinc-200 pt-6">
        <button
          type="submit"
          className="min-h-12 w-full rounded-xl bg-zinc-950 px-6 font-medium text-white transition hover:bg-zinc-800 sm:w-auto"
        >
          Continuar
        </button>
      </div>
    </form>
  );
}
