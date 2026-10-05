import Link from 'next/link';

export default function AltaNegocio() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-8">
      <Link
        href="/"
        className="text-sm font-medium text-zinc-600 hover:text-zinc-950"
      >
        ← Volver
      </Link>

      <section className="mt-8">
        <p className="text-sm font-medium text-zinc-500">Paso 1 de 5</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Configura tu negocio
        </h1>

        <p className="mt-3 text-zinc-600">
          Comenzaremos con la información básica del negocio.
        </p>
      </section>
    </main>
  );
}