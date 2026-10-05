'use client';

import { FormEvent, useState } from 'react';
import { ErroresServicio, Servicio } from '../tipos';
import { validarServicio } from '../validaciones';

interface PropiedadesFormularioServicios {
  servicios: Servicio[];
  alCambiar: (servicios: Servicio[]) => void;
  alRegresar: () => void;
  alContinuar: () => void;
}

// usa texto en el borrador para permitir vaciar los campos numericos
interface CamposServicio {
  nombre: string;
  duracionMinutos: string;
  precio: string;
}

const camposIniciales: CamposServicio = {
  nombre: '',
  duracionMinutos: '',
  precio: '',
};

const formatoPrecio = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

/** administra los servicios antes de guardarlos en el estado general */
export function FormularioServicios({
  servicios,
  alCambiar,
  alRegresar,
  alContinuar,
}: PropiedadesFormularioServicios) {
  const [campos, setCampos] = useState<CamposServicio>(camposIniciales);
  const [servicioEditandoId, setServicioEditandoId] = useState<
    string | null
  >(null);
  const [errores, setErrores] = useState<ErroresServicio>({});
  const [errorLista, setErrorLista] = useState('');

  function limpiarFormulario() {
    setCampos(camposIniciales);
    setServicioEditandoId(null);
    setErrores({});
  }

  function manejarGuardado(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const datosServicio = {
      nombre: campos.nombre.trim(),
      duracionMinutos: Number(campos.duracionMinutos),
      precio: Number(campos.precio),
    };
    const nuevosErrores = validarServicio(datosServicio);

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    if (servicioEditandoId) {
      alCambiar(
        servicios.map((servicio) =>
          servicio.id === servicioEditandoId
            ? { ...datosServicio, id: servicio.id }
            : servicio
        )
      );
    } else {
      alCambiar([
        ...servicios,
        {
          ...datosServicio,
          id: crypto.randomUUID(),
        },
      ]);
    }

    setErrorLista('');
    limpiarFormulario();
  }

  function editarServicio(servicio: Servicio) {
    setCampos({
      nombre: servicio.nombre,
      duracionMinutos: String(servicio.duracionMinutos),
      precio: String(servicio.precio),
    });
    setServicioEditandoId(servicio.id);
    setErrores({});
  }

  function eliminarServicio(id: string) {
    alCambiar(servicios.filter((servicio) => servicio.id !== id));

    if (servicioEditandoId === id) {
      limpiarFormulario();
    }
  }

  function manejarContinuar() {
    if (servicios.length === 0) {
      setErrorLista('Agrega al menos un servicio para continuar.');
      return;
    }

    setErrorLista('');
    alContinuar();
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={manejarGuardado}
        noValidate
        className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-zinc-950">
              {servicioEditandoId ? 'Editar servicio' : 'Agregar servicio'}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Define el servicio, su duración y el precio para el cliente.
            </p>
          </div>

          {servicioEditandoId && (
            <button
              type="button"
              onClick={limpiarFormulario}
              className="min-h-11 shrink-0 text-sm font-medium text-zinc-600 hover:text-zinc-950"
            >
              Cancelar
            </button>
          )}
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="servicio-nombre"
              className="block text-sm font-medium text-zinc-900"
            >
              Nombre del servicio
            </label>
            <input
              id="servicio-nombre"
              type="text"
              value={campos.nombre}
              placeholder="Ej. Corte de cabello"
              aria-invalid={Boolean(errores.nombre)}
              aria-describedby={
                errores.nombre ? 'error-servicio-nombre' : undefined
              }
              onChange={(evento) =>
                setCampos((actual) => ({
                  ...actual,
                  nombre: evento.target.value,
                }))
              }
              className="mt-2 min-h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
            />
            {errores.nombre && (
              <p
                id="error-servicio-nombre"
                className="mt-2 text-sm text-red-600"
              >
                {errores.nombre}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="servicio-duracion"
                className="block text-sm font-medium text-zinc-900"
              >
                Duración en minutos
              </label>
              <input
                id="servicio-duracion"
                type="number"
                min="1"
                step="1"
                inputMode="numeric"
                value={campos.duracionMinutos}
                placeholder="Ej. 45"
                aria-invalid={Boolean(errores.duracionMinutos)}
                aria-describedby={
                  errores.duracionMinutos
                    ? 'error-servicio-duracion'
                    : undefined
                }
                onChange={(evento) =>
                  setCampos((actual) => ({
                    ...actual,
                    duracionMinutos: evento.target.value,
                  }))
                }
                className="mt-2 min-h-12 w-full rounded-xl border border-zinc-300 bg-white px-4 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
              />
              {errores.duracionMinutos && (
                <p
                  id="error-servicio-duracion"
                  className="mt-2 text-sm text-red-600"
                >
                  {errores.duracionMinutos}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="servicio-precio"
                className="block text-sm font-medium text-zinc-900"
              >
                Precio
              </label>
              <div className="relative mt-2">
                <span
                  className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-zinc-500"
                  aria-hidden="true"
                >
                  $
                </span>
                <input
                  id="servicio-precio"
                  type="number"
                  min="0.01"
                  step="0.01"
                  inputMode="decimal"
                  value={campos.precio}
                  placeholder="Ej. 350"
                  aria-invalid={Boolean(errores.precio)}
                  aria-describedby={
                    errores.precio ? 'error-servicio-precio' : undefined
                  }
                  onChange={(evento) =>
                    setCampos((actual) => ({
                      ...actual,
                      precio: evento.target.value,
                    }))
                  }
                  className="min-h-12 w-full rounded-xl border border-zinc-300 bg-white pr-4 pl-8 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950/10"
                />
              </div>
              {errores.precio && (
                <p
                  id="error-servicio-precio"
                  className="mt-2 text-sm text-red-600"
                >
                  {errores.precio}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 min-h-12 w-full rounded-xl bg-zinc-950 px-6 font-medium text-white transition hover:bg-zinc-800 sm:w-auto"
        >
          {servicioEditandoId ? 'Guardar cambios' : 'Agregar servicio'}
        </button>
      </form>

      <section className="mt-8" aria-labelledby="servicios-agregados">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="servicios-agregados"
            className="text-xl font-semibold text-zinc-950"
          >
            Servicios agregados
          </h2>
          <span className="text-sm text-zinc-500">
            {servicios.length} {servicios.length === 1 ? 'servicio' : 'servicios'}
          </span>
        </div>

        {servicios.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-5 py-8 text-center">
            <p className="font-medium text-zinc-900">
              Aún no hay servicios
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Usa el formulario para agregar el primer servicio del negocio.
            </p>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {servicios.map((servicio) => (
              <li
                key={servicio.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-zinc-950">
                      {servicio.nombre}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-600">
                      {servicio.duracionMinutos} min ·{' '}
                      {formatoPrecio.format(servicio.precio)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={() => editarServicio(servicio)}
                      className="min-h-11 rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => eliminarServicio(servicio.id)}
                      className="min-h-11 rounded-lg border border-red-200 px-4 text-sm font-medium text-red-700 hover:bg-red-50"
                      aria-label={`Eliminar ${servicio.nombre}`}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {errorLista && (
        <p
          className="mt-5 text-sm font-medium text-red-600"
          role="alert"
        >
          {errorLista}
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
          type="button"
          onClick={manejarContinuar}
          className="min-h-12 rounded-xl bg-zinc-950 px-6 font-medium text-white hover:bg-zinc-800"
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
