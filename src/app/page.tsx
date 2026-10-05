import Link from "next/link";

export default function Inicio() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-12">
      <section className="w-full">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">
          PIK
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
          Reto técnico
        </h1>

        <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600">
          Selecciona uno de los dos flujos disponibles para comenzar.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-zinc-950">
              Alta de un negocio
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Registra la información, servicios y personal de un nuevo negocio
              en PIK.
            </p>

            <Link
              href="/alta-negocio"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
            >
              Comenzar alta
            </Link>
          </article>

          <article className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-xl font-semibold text-zinc-950">
              Reservar una cita
            </h2>

            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Selecciona un servicio, quién te atenderá y un horario disponible.
            </p>

            <Link
              href="/negocio/studio-nova"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
            >
              Reservar cita
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
