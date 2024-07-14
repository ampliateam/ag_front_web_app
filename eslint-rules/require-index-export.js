import fs from 'fs';
import path from 'path';

export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'Ensure all files in firebase-auth are exported from index.ts',
      category: 'Possible Errors',
      recommended: false,
    },
    fixable: null,
    schema: [],
  },
  create(context) {
    return {
      Program(node) {
        const filename = context.getFilename();

        if (!filename.includes('\\domain')) return;
        
        const dirPath = path.dirname(filename);
        const indexPath = path.join(dirPath, 'index.ts');
        
        if (!fs.existsSync(indexPath)) return;
        
        const indexContent = fs.readFileSync(indexPath, 'utf8');
        const currentFile = path.basename(filename);
        
        if (currentFile === 'index.ts') return;
        
        const expectedExport = `export * from './${path.parse(currentFile).name}';`;
        
        if (!indexContent.includes(expectedExport)) {
          context.report({
            node,
            message: `El archivo ${currentFile} no está exportando en index.ts`,
          });
        }
      },
    };
  },
};