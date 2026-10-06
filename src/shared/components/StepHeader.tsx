interface StepHeaderProps {
  pasoActual: number;
  totalPasos: number;
  etiqueta: string;
}

export function StepHeader({
  pasoActual,
  totalPasos,
  etiqueta,
}: StepHeaderProps) {
  const progreso = (pasoActual / totalPasos) * 100;

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-zinc-600">
          Paso {pasoActual} de {totalPasos}
        </p>
        <span className="text-sm text-zinc-500">{etiqueta}</span>
      </div>

      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-200"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-zinc-950 transition-all"
          style={{ width: `${progreso}%` }}
        />
      </div>
    </>
  );
}
