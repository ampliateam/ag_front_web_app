export const getProfesionalLS = (): any => {
  const profesionalString = localStorage.getItem('profesional') || '{}';
  const profesionalLs = JSON.parse(profesionalString);
  return profesionalLs;
};