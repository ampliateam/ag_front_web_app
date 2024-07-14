import path from 'path';

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow direct imports from firebase-auth except in index.ts',
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
          path.dirname(currentFile).endsWith('domain\\repository\\firebase-authentication')) {
          return;
        }
        // Verificar si la importación es desde index.ts
        if (!importPath.endsWith('index') && importPath.includes('.repository')) {
          context.report({
            node,
            message: 'Solo se puede importar módulos desde index.ts',
            fix(fixer) {
              const newImport = importPath.replace(/\/[^/]+$/, '/index');
              return fixer.replaceText(source, `'${newImport}'`);
            }
          });
        }

      }
    };
  },
};