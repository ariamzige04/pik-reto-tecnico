'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import {
  DatosNegocio,
  ErroresDatosNegocio,
} from '../tipos';
import { validarDatosNegocio } from '../validaciones';

const datosIniciales: DatosNegocio = {
  nombre: '',
  categoria: '',
  telefono: '',
};

export function FormularioDatosNegocio() {
  const [datos, setDatos] = useState<DatosNegocio>(datosIniciales);
  const [errores, setErrores] = useState<ErroresDatosNegocio>({});

  function manejarEnvio(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const nuevosErrores = validarDatosNegocio(datos);

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    // El siguiente paso se conectará cuando implementemos ubicación y horarios.
    console.log('Datos del negocio válidos:', datos);
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-6 sm:py-10">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
      >
        ← Volver
      </Link>

      <section className="mt-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-zinc-600">
            Paso 1 de 5
          </p>

          <span className="text-sm text-zinc-500">
            Datos del negocio
          </span>
        </div>

        <div
          className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200"
          aria-hidden="true"
        >
          <div className="h-full w-1/5 rounded-full bg-zinc-950" />
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
            Configura tu negocio
          </h1>

          <p className="mt-3 max-w-xl leading-7 text-zinc-600">
            Agrega la información básica que utilizaremos para identificar tu
            negocio dentro de PIK.
          </p>
        </div>

        <form
          onSubmit={manejarEnvio}
          noValidate
          className="mt-8 space-y-6"
        >
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-zinc-900"
            >
              Nombre del negocio
            </label>

            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="organization"
              placeholder="Ej. Studio Nova"
              value={datos.nombre}
              aria-invalid={Boolean(errores.nombre)}
              aria-describedby={
                errores.nombre ? 'error-nombre' : undefined
              }
              onChange={(evento) =>
                setDatos((actual) => ({
                  ...actual,
                  nombre: evento.target.value,
                }))
              }
              className="mt-2 min-h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
            />

            {errores.nombre && (
              <p
                id="error-nombre"
                className="mt-2 text-sm text-red-600"
              >
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
              name="categoria"
              value={datos.categoria}
              aria-invalid={Boolean(errores.categoria)}
              aria-describedby={
                errores.categoria ? 'error-categoria' : undefined
              }
              onChange={(evento) =>
                setDatos((actual) => ({
                  ...actual,
                  categoria: evento.target
                    .value as DatosNegocio['categoria'],
                }))
              }
              className="mt-2 min-h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-zinc-950 outline-none transition focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
            >
              <option value="">Selecciona una categoría</option>
              <option value="salon">Salón de belleza</option>
              <option value="barberia">Barbería</option>
              <option value="spa">Spa</option>
              <option value="unas">Estudio de uñas</option>
            </select>

            {errores.categoria && (
              <p
                id="error-categoria"
                className="mt-2 text-sm text-red-600"
              >
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
              name="telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="81 1234 5678"
              value={datos.telefono}
              aria-invalid={Boolean(errores.telefono)}
              aria-describedby={
                errores.telefono ? 'error-telefono' : undefined
              }
              onChange={(evento) =>
                setDatos((actual) => ({
                  ...actual,
                  telefono: evento.target.value,
                }))
              }
              className="mt-2 min-h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
            />

            {errores.telefono && (
              <p
                id="error-telefono"
                className="mt-2 text-sm text-red-600"
              >
                {errores.telefono}
              </p>
            )}
          </div>

          <div className="flex justify-end border-t border-zinc-200 pt-6">
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-zinc-950 px-6 font-medium text-white transition hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 sm:w-auto"
            >
              Continuar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}