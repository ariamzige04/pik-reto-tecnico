import Link from 'next/link';

export default function PerfilNegocio() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-8">
      <Link
        href="/"
        className="text-sm font-medium text-zinc-600 hover:text-zinc-950"
      >
        ← Volver
      </Link>

      <section className="mt-8">
        <p className="text-sm font-medium text-zinc-500">Salón de belleza</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Studio Nova
        </h1>

        <p className="mt-3 text-zinc-600">
          Selecciona el servicio que deseas reservar.
        </p>
      </section>
    </main>
  );
}