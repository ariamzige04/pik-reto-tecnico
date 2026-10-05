import {
  DatosNegocio,
  DireccionNegocio,
  ErroresDatosNegocio,
  ErroresUbicacionHorario,
  HorarioAtencion,
} from './tipos';

export function validarDatosNegocio(
  datos: DatosNegocio
): ErroresDatosNegocio {
  const errores: ErroresDatosNegocio = {};

  if (!datos.nombre.trim()) {
    errores.nombre = 'Ingresa el nombre de tu negocio.';
  }

  if (!datos.categoria) {
    errores.categoria = 'Selecciona una categoría.';
  }

  const telefonoNumerico = datos.telefono.replace(/\D/g, '');

  if (!telefonoNumerico) {
    errores.telefono = 'Ingresa un teléfono de contacto.';
  } else if (telefonoNumerico.length !== 10) {
    errores.telefono = 'Ingresa un teléfono válido de 10 dígitos.';
  }

  return errores;
}

export function validarUbicacionHorario(
  direccion: DireccionNegocio,
  horarios: HorarioAtencion[]
): ErroresUbicacionHorario {
  const errores: ErroresUbicacionHorario = {};

  if (!direccion.calleNumero.trim()) {
    errores.calleNumero = 'Ingresa la calle y número.';
  }

  if (!direccion.colonia.trim()) {
    errores.colonia = 'Ingresa la colonia.';
  }

  if (!direccion.ciudad.trim()) {
    errores.ciudad = 'Ingresa la ciudad.';
  }

  if (!direccion.estado.trim()) {
    errores.estado = 'Ingresa el estado.';
  }

  if (!/^\d{5}$/.test(direccion.codigoPostal)) {
    errores.codigoPostal = 'Ingresa un código postal válido de 5 dígitos.';
  }

  const diasAbiertos = horarios.filter((horario) => horario.abierto);

  if (diasAbiertos.length === 0) {
    errores.horarios = 'Selecciona al menos un día de atención.';
    return errores;
  }

  const horarioInvalido = diasAbiertos.some(
    (horario) =>
      !horario.horaApertura ||
      !horario.horaCierre ||
      horario.horaApertura >= horario.horaCierre
  );

  if (horarioInvalido) {
    errores.horarios =
      'Revisa los horarios: la hora de cierre debe ser posterior a la apertura.';
  }

  return errores;
}