'use client';

interface StepActionsProps {
  alRegresar: () => void;
  alAccionPrincipal?: () => void;
  textoPrincipal?: string;
  tipoPrincipal?: 'button' | 'submit';
  separacionSuperior?: boolean;
}

export function StepActions({
  alRegresar,
  alAccionPrincipal,
  textoPrincipal = 'Continuar',
  tipoPrincipal = 'button',
  separacionSuperior = true,
}: StepActionsProps) {
  return (
    <div
      className={`${separacionSuperior ? 'mt-8 ' : ''}flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-between`}
    >
      <button
        type="button"
        onClick={alRegresar}
        className="min-h-12 rounded-xl border border-zinc-300 bg-white px-6 font-medium text-zinc-900 hover:bg-zinc-50"
      >
        Regresar
      </button>
      <button
        type={tipoPrincipal}
        onClick={alAccionPrincipal}
        className="min-h-12 rounded-xl bg-zinc-950 px-6 font-medium text-white hover:bg-zinc-800"
      >
        {textoPrincipal}
      </button>
    </div>
  );
}
