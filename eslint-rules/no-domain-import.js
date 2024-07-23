import path from 'path';

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Deshabilita la importanción directa de módulos en domain que no sea a través de index.ts',
      category: 'Best Practices',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const { source } = node;
        const importPath = source.value;
        const currentFile = context.getFilename();

        // Verificar si la importación es de firebase-auth
        // Permitir importaciones en index.ts
        if (path.basename(currentFile) === 'index.ts' &&
          path.dirname(currentFile).includes('\\domain')) {
          return;
        }
        // Verificar si la importación es desde index.ts
        if(currentFile.includes('\\domain')){
          if (!importPath.endsWith('index') && (importPath.includes('.repository') || importPath.includes('.service'))) {
            context.report({
              node,
              message: 'Solo se puede importar módulos desde index.ts',
              fix(fixer) {
                const newImport = importPath.replace(/\/[^/]+$/, '');
                return fixer.replaceText(source, `'${newImport}'`);
              }
            });
          }
        }
        // verificar si es externo a domain, si no se importa de otro lado que no sea service
        if(!currentFile.includes('\\domain')){
          if (importPath.includes('domain/') && !importPath.endsWith('/services/index') && !importPath.endsWith('/services')) {
            context.report({
              node,
              message: 'Solo se puede importar módulos desde \'@/domain/services\'',
              fix(fixer) {
                const newImport = importPath.replace(/\/[^/]+$/, '/index');
                return fixer.replaceText(source, `'${newImport}'`);
              }
            });
          }
        }
      }
    };
  },
};