interface EmptyStateProps {
  titulo: string;
  descripcion: string;
}

export function EmptyState({ titulo, descripcion }: EmptyStateProps) {
  return (
    <div className="mt-4 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-5 py-8 text-center">
      <p className="font-medium text-zinc-900">{titulo}</p>
      <p className="mt-2 text-sm leading-6 text-zinc-600">{descripcion}</p>
    </div>
  );
}
