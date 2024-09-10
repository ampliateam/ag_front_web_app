export const etiquetasProfesional = [
  'odontologia',
  'entrenamiento',
  'nutricion',
  'otro',
];

export const simple = (etiqueta: string) => {
  if (etiqueta === 'odontologia') return 'Odontologia';
  if (etiqueta === 'entrenamiento') return 'Entrenamiento';
  if (etiqueta === 'nutricion') return 'Nutricion';
  if (etiqueta === 'otro') return 'Otro';
  return 'Sin profesional';
};

export const propio = (etiqueta: string) => {
  if (etiqueta === 'odontologia') return 'Odontologo';
  if (etiqueta === 'entrenamiento') return 'Entrenador';
  if (etiqueta === 'nutricion') return 'Nutricionista';
  if (etiqueta === 'otro') return 'Otro';
  return 'Sin profesional';
};