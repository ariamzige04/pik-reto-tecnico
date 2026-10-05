'use client';

import Link from 'next/link';
import { useState } from 'react';
import { DatosAltaNegocio, DiaSemana } from '../tipos';

interface PropiedadesResumenAltaNegocio {
  datos: DatosAltaNegocio;
  alRegresar: () => void;
}

const nombresCategorias: Record<
  Exclude<DatosAltaNegocio['datosNegocio']['categoria'], ''>,
  string
> = {
  salon: 'Salón de belleza',
  barberia: 'Barbería',
  spa: 'Spa',
  unas: 'Estudio de uñas',
};

const nombresDias: Record<DiaSemana, string> = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sabado: 'Sábado',
  domingo: 'Domingo',
};

const formatoPrecio = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

/** muestra todos los datos capturados y simula la confirmacion del alta */
export function ResumenAltaNegocio({
  datos,
  alRegresar,
}: PropiedadesResumenAltaNegocio) {
  // la confirmacion es local porque el reto no utiliza servicios externos
  const [confirmado, setConfirmado] = useState(false);

  function nombresServicios(idsServicios: string[]) {
    return datos.servicios
      .filter((servicio) => idsServicios.includes(servicio.id))
      .map((servicio) => servicio.nombre);
  }

  if (confirmado) {
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
          Negocio registrado
        </h2>
        <p className="mt-3 leading-7 text-zinc-600">
          {datos.datosNegocio.nombre} quedó configurado correctamente en esta
          demostración.
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
    <div className="mt-8 space-y-5">
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-zinc-950">
          Datos del negocio
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-zinc-500">Nombre</dt>
            <dd className="mt-1 font-medium text-zinc-950">
              {datos.datosNegocio.nombre}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-zinc-500">Categoría</dt>
            <dd className="mt-1 font-medium text-zinc-950">
              {datos.datosNegocio.categoria
                ? nombresCategorias[datos.datosNegocio.categoria]
                : 'Sin categoría'}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm text-zinc-500">Teléfono</dt>
            <dd className="mt-1 font-medium text-zinc-950">
              {datos.datosNegocio.telefono}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-zinc-950">
          Ubicación y horarios
        </h2>
        <p className="mt-4 leading-7 text-zinc-700">
          {datos.direccion.calleNumero}, {datos.direccion.colonia},{' '}
          {datos.direccion.ciudad}, {datos.direccion.estado}. CP{' '}
          {datos.direccion.codigoPostal}
        </p>
        <ul className="mt-5 divide-y divide-zinc-200">
          {datos.horarios.map((horario) => (
            <li
              key={horario.dia}
              className="flex items-center justify-between gap-4 py-3 text-sm"
            >
              <span className="font-medium text-zinc-900">
                {nombresDias[horario.dia]}
              </span>
              <span className="text-right text-zinc-600">
                {horario.abierto
                  ? `${horario.horaApertura} - ${horario.horaCierre}`
                  : 'Cerrado'}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-zinc-950">Servicios</h2>
        <ul className="mt-4 space-y-3">
          {datos.servicios.map((servicio) => (
            <li
              key={servicio.id}
              className="flex items-start justify-between gap-4 rounded-xl bg-zinc-50 p-4"
            >
              <div>
                <h3 className="font-medium text-zinc-950">
                  {servicio.nombre}
                </h3>
                <p className="mt-1 text-sm text-zinc-600">
                  {servicio.duracionMinutos} minutos
                </p>
              </div>
              <span className="shrink-0 font-medium text-zinc-950">
                {formatoPrecio.format(servicio.precio)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-zinc-950">Personal</h2>
        <ul className="mt-4 space-y-3">
          {datos.personal.map((miembro) => (
            <li key={miembro.id} className="rounded-xl bg-zinc-50 p-4">
              <h3 className="font-medium text-zinc-950">
                {miembro.nombre}
              </h3>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                {nombresServicios(miembro.idsServicios).join(', ')}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={alRegresar}
          className="min-h-12 rounded-xl border border-zinc-300 bg-white px-6 font-medium text-zinc-900 hover:bg-zinc-50"
        >
          Regresar
        </button>
        <button
          type="button"
          onClick={() => setConfirmado(true)}
          className="min-h-12 rounded-xl bg-zinc-950 px-6 font-medium text-white hover:bg-zinc-800"
        >
          Confirmar alta
        </button>
      </div>
    </div>
  );
}
