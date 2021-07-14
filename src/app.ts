import { createSSRApp } from 'vue';
import { _createRouter } from './router';
import App from './App.vue';

export default function (args: any) {
  const app = createSSRApp(App);
  const router = _createRouter();

  app.use(router);

  return { app, router };
}
