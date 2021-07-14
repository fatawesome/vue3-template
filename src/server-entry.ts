import createApp from './app';

export default function (url: string) {
  const { app, router } = createApp({
    /*...*/
  });

  return new Promise((resolve, reject) => {
    // set server-side router"s location
    router.push(url);

    router.isReady()
      .then(() => {
        const matchedComponents = router.currentRoute.value.matched;
        // no matched routes, reject with 404
        if (!matchedComponents.length) {
          router.push("/").then(() => {
            return resolve({ app, router });
          })
          return;
        }

        // the Promise should resolve to the app instance so it can be rendered
        return resolve({ app, router });
      }).catch(() => reject);
  })
};
