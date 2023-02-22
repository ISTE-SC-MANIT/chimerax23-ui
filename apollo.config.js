module.exports = {
  client: {
    service: {
      name: 'chimerax22-ui',
      localSchemaFile: './schema.json',
    },
    excludes: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
    target: 'typescript',
  },
};
