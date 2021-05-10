import {defineConfig} from 'umi';

const { API_URL, STUDYMAMA_UI, CONTENT_APP_URL } = process.env;

export default defineConfig({
  define: {
    'process.env.API_URL': API_URL,
    'process.env.STUDYMAMA_UI': STUDYMAMA_UI,
    'process.env.CONTENT_APP_URL': CONTENT_APP_URL,
  },
  plugins: [
    'react-dev-inspector/plugins/umi/react-inspector',
  ],
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  webpack5: {},
});
