
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import {defineConfig} from "umi";

const { REACT_APP_ENV, API_URL, STUDYMAMA_UI } = process.env;

export default defineConfig({
  define: {
    'process.env.REACT_APP_ENV': REACT_APP_ENV,
    'process.env.API_URL': API_URL,
    'process.env.STUDYMAMA_UI': STUDYMAMA_UI,
  },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  routes,
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  fastRefresh: {},
  esbuild: {}
},);
