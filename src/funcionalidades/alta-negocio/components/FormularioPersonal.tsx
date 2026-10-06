"use client";

import { FormEvent, useState } from "react";
import { generarIdentificador } from "../identificadores";
import { ErroresMiembroPersonal, MiembroPersonal, Servicio } from "../types";
import { validarMiembroPersonal } from "../validators";

interface FormularioPersonalProps {
  personal: MiembroPersonal[];
  servicios: Servicio[];
  alCambiar: (personal: MiembroPersonal[]) => void;
  alRegresar: () => void;
  alContinuar: () => void;
}

interface CamposPersonal {
  nombre: string;
  idsServicios: string[];
}

const camposIniciales: CamposPersonal = {
  nombre: "",
  idsServicios: [],
};

/** administra el personal y sus servicios asignados */
export function FormularioPersonal({
  personal,
  servicios,
  alCambiar,
  alRegresar,
  alContinuar,
}: FormularioPersonalProps) {
  const [campos, setCampos] = useState<CamposPersonal>(camposIniciales);
  const [miembroEditandoId, setMiembroEditandoId] = useState<string | null>(
    null,
  );
  const [errores, setErrores] = useState<ErroresMiembroPersonal>({});
  const [errorLista, setErrorLista] = useState("");

  function limpiarFormulario() {
    setCampos(camposIniciales);
    setMiembroEditandoId(null);
    setErrores({});
  }

  function alternarServicio(idServicio: string) {
    setCampos((actual) => ({
      ...actual,
      idsServicios: actual.idsServicios.includes(idServicio)
        ? actual.idsServicios.filter((id) => id !== idServicio)
        : [...actual.idsServicios, idServicio],
    }));
  }

  function manejarGuardado(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const datosMiembro = {
      nombre: campos.nombre.trim(),
      idsServicios: campos.idsServicios,
    };
    const nuevosErrores = validarMiembroPersonal(datosMiembro);

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    if (miembroEditandoId) {
      alCambiar(
        personal.map((miembro) =>
          miembro.id === miembroEditandoId
            ? { ...datosMiembro, id: miembro.id }
            : miembro,
        ),
      );
    } else {
      alCambiar([
        ...personal,
        {
          ...datosMiembro,
          id: generarIdentificador("personal"),
        },
      ]);
    }

    setErrorLista("");
    limpiarFormulario();
  }

  function editarMiembro(miembro: MiembroPersonal) {
    setCampos({
      nombre: miembro.nombre,
      idsServicios: miembro.idsServicios,
    });
    setMiembroEditandoId(miembro.id);
    setErrores({});
  }

  function eliminarMiembro(id: string) {
    alCambiar(personal.filter((miembro) => miembro.id !== id));

    if (miembroEditandoId === id) {
      limpiarFormulario();
    }
  }

  function manejarContinuar() {
    if (personal.length === 0) {
      setErrorLista("Agrega al menos una persona para continuar.");
      return;
    }

    if (personal.some((miembro) => miembro.idsServicios.length === 0)) {
      setErrorLista("Asigna al menos un servicio a cada persona.");
      return;
    }

    setErrorLista("");
    alContinuar();
  }

  function nombresServicios(idsServicios: string[]) {
    return servicios
      .filter((servicio) => idsServicios.includes(servicio.id))
      .map((servicio) => servicio.nombre);
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
              {miembroEditandoId ? "Editar persona" : "Agregar persona"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Indica quién atiende y qué servicios puede realizar.
            </p>
          </div>

          {miembroEditandoId && (
            <button
              type="button"
              onClick={limpiarFormulario}
              className="min-h-11 shrink-0 text-sm font-medium text-zinc-600 hover:text-zinc-950"
            >
              Cancelar
            </button>
          )}
        </div>

        <div className="mt-6">
          <label
            htmlFor="personal-nombre"
            className="block text-sm font-medium text-zinc-900"
          >
            Nombre
          </label>
          <input
            id="personal-nombre"
            type="text"
            value={campos.nombre}
            placeholder="Ej. Daniela Ruiz"
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={
              errores.nombre ? "error-personal-nombre" : undefined
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
            <p id="error-personal-nombre" className="mt-2 text-sm text-red-600">
              {errores.nombre}
            </p>
          )}
        </div>

        <fieldset
          className="mt-6"
          aria-describedby={
            errores.servicios ? "error-personal-servicios" : undefined
          }
        >
          <legend className="text-sm font-medium text-zinc-900">
            Servicios que atiende
          </legend>
          <div className="mt-3 space-y-2">
            {servicios.map((servicio) => (
              <label
                key={servicio.id}
                className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 px-4 py-3 hover:bg-zinc-50"
              >
                <input
                  type="checkbox"
                  checked={campos.idsServicios.includes(servicio.id)}
                  onChange={() => alternarServicio(servicio.id)}
                  className="h-5 w-5 shrink-0"
                />
                <span className="text-sm font-medium text-zinc-900">
                  {servicio.nombre}
                </span>
              </label>
            ))}
          </div>
          {errores.servicios && (
            <p
              id="error-personal-servicios"
              className="mt-2 text-sm text-red-600"
            >
              {errores.servicios}
            </p>
          )}
        </fieldset>

        <button
          type="submit"
          className="mt-6 min-h-12 w-full rounded-xl bg-zinc-950 px-6 font-medium text-white transition hover:bg-zinc-800 sm:w-auto"
        >
          {miembroEditandoId ? "Guardar cambios" : "Agregar persona"}
        </button>
      </form>

      <section className="mt-8" aria-labelledby="personal-agregado">
        <div className="flex items-center justify-between gap-4">
          <h2
            id="personal-agregado"
            className="text-xl font-semibold text-zinc-950"
          >
            Personal agregado
          </h2>
          <span className="text-sm text-zinc-500">
            {personal.length} {personal.length === 1 ? "persona" : "personas"}
          </span>
        </div>

        {personal.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-5 py-8 text-center">
            <p className="font-medium text-zinc-900">Aún no hay personal</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Agrega a la primera persona y asígnale sus servicios.
            </p>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {personal.map((miembro) => (
              <li
                key={miembro.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-zinc-950">
                      {miembro.nombre}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">
                      {nombresServicios(miembro.idsServicios).join(", ") ||
                        "Sin servicios asignados"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:flex">
                    <button
                      type="button"
                      onClick={() => editarMiembro(miembro)}
                      className="min-h-11 rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => eliminarMiembro(miembro.id)}
                      className="min-h-11 rounded-lg border border-red-200 px-4 text-sm font-medium text-red-700 hover:bg-red-50"
                      aria-label={`Eliminar a ${miembro.nombre}`}
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
        <p className="mt-5 text-sm font-medium text-red-600" role="alert">
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
