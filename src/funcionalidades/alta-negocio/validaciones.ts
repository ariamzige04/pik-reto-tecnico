import { DatosNegocio, ErroresDatosNegocio } from "./tipos";

export function validarDatosNegocio(datos: DatosNegocio): ErroresDatosNegocio {
  const errores: ErroresDatosNegocio = {};

  if (!datos.nombre.trim()) {
    errores.nombre = "Ingresa el nombre de tu negocio.";
  }

  if (!datos.categoria) {
    errores.categoria = "Selecciona una categoría.";
  }

  const telefonoNumerico = datos.telefono.replace(/\D/g, "");

  if (!telefonoNumerico) {
    errores.telefono = "Ingresa un teléfono de contacto.";
  } else if (telefonoNumerico.length !== 10) {
    errores.telefono = "Ingresa un teléfono válido de 10 dígitos.";
  }

  return errores;
}
