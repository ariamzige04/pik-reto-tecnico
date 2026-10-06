'use client';

import { useEffect, useRef } from 'react';

export function useStepFocus(pasoActual: number) {
  const contenedorRef = useRef<HTMLElement>(null);
  const pasoAnteriorRef = useRef(pasoActual);

  useEffect(() => {
    if (pasoAnteriorRef.current === pasoActual) {
      return;
    }

    pasoAnteriorRef.current = pasoActual;

    // anuncia el nuevo contenido sin mover el foco durante la carga inicial
    contenedorRef.current
      ?.querySelector<HTMLHeadingElement>('h1')
      ?.focus();
  }, [pasoActual]);

  return contenedorRef;
}
