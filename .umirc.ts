import { resolve } from 'path';

export default {
  npmClient: 'pnpm',
  outputPath: 'lib',
  chainWebpack: (config) => {
    config.entry('umi').clear().end();
    config.entry('umi').add(resolve(__dirname, './packages/index.tsx')).end();
    config.output.libraryTarget('umd');
  },
};
