import { NegocioReservable } from '../types';

interface PerfilNegocioProps {
  negocio: NegocioReservable;
  alReservar: () => void;
}

const formatoPrecio = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
});

/** presenta el negocio y abre el flujo de reservacion */
export function PerfilNegocio({
  negocio,
  alReservar,
}: PerfilNegocioProps) {
  return (
    <div className="mt-8 space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7">
        <p className="text-sm font-medium text-zinc-500">
          {negocio.categoria}
        </p>
        <h1
          tabIndex={-1}
          className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
        >
          {negocio.nombre}
        </h1>
        <p className="mt-3 leading-7 text-zinc-600">
          {negocio.descripcion}
        </p>

        <div className="mt-5 grid gap-3 text-sm text-zinc-700 sm:grid-cols-2">
          <p>★ {negocio.calificacion} · {negocio.totalResenas} reseñas</p>
          <p>{negocio.horarioResumen}</p>
          <p className="sm:col-span-2">{negocio.direccion}</p>
        </div>
      </section>

      <section aria-labelledby="servicios-destacados">
        <h2
          id="servicios-destacados"
          className="text-xl font-semibold text-zinc-950"
        >
          Servicios
        </h2>
        <ul className="mt-4 space-y-3">
          {negocio.servicios.map((servicio) => (
            <li
              key={servicio.id}
              className="rounded-2xl border border-zinc-200 bg-white p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-zinc-950">
                    {servicio.nombre}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">
                    {servicio.descripcion}
                  </p>
                  <p className="mt-2 text-sm text-zinc-500">
                    {servicio.duracionMinutos} minutos
                  </p>
                </div>
                <span className="shrink-0 font-medium text-zinc-950">
                  {formatoPrecio.format(servicio.precio)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <button
        type="button"
        onClick={alReservar}
        className="min-h-12 w-full rounded-xl bg-zinc-950 px-6 font-medium text-white hover:bg-zinc-800"
      >
        Reservar una cita
      </button>
    </div>
  );
}
