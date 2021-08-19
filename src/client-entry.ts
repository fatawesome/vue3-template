import createApp from './app';

// client-specific bootstrapping logic...

const { app, router } = createApp({
  // here we can pass additional arguments to app factory
});

router.isReady().then(() => {
  const vm = app.mount('#app', true);
});
