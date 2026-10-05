/** genera un identificador compatible con localhost y direcciones de red */
export function generarIdentificador(prefijo: string) {
  // usa un respaldo porque randomuuid puede faltar en origenes http de red local
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }

  const parteAleatoria = Math.random().toString(36).slice(2, 10);
  return `${prefijo}-${Date.now()}-${parteAleatoria}`;
}
