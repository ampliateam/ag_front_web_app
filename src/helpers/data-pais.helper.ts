interface IDataPais {
  id: string,
  codigoTelefono: string,
  abreviatura: string,
  porIdioma: object,
}

export const listaDataPais: IDataPais[] = [];

const agregarPais = (val) => {
  listaDataPais.push({
    id: val.id,
    codigoTelefono: val.codigoTelefono,
    abreviatura: val.abreviatura,
    porIdioma: val.porIdioma,
  });
};

// Paraguay
agregarPais({
  id: 'paraguay',
  codigoTelefono: '+595',
  abreviatura: 'PY',
  porIdioma: {
    espanol: { titulo: 'Paraguay' },
  }
});

// Estados unidos
agregarPais({
  id: 'estados-unidos',
  codigoTelefono: '+1',
  abreviatura: 'US',
  porIdioma: {
    espanol: { titulo: 'Estados Unidos' },
  }
});

// Brasil
agregarPais({
  id: 'brasil',
  codigoTelefono: '+55',
  abreviatura: 'BR',
  porIdioma: {
    espanol: { titulo: 'Brasil' },
  }
});

// Argentina
agregarPais({
  id: 'argentina',
  codigoTelefono: '+54',
  abreviatura: 'AR',
  porIdioma: {
    espanol: { titulo: 'Argentina' },
  }
});
