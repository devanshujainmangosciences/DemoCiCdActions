/**This code is setting up a proxy server using the `http-proxy-middleware` package. The
`createProxyMiddleware` function is used to create a middleware function that will forward requests
to the specified target URL. The `module.exports` function takes an `app` parameter, which is an
instance of an Express application, and sets up several proxy routes using the `app.use` method.
Each route is defined with a path prefix and a target URL, which is determined based on the value of
the `VITE_ENV` environment variable. The `changeOrigin` option is set to `true` to ensure that the
origin header is set to the target URL. This allows the target server to correctly handle requests
and responses. */
const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/vbc-admin',
    createProxyMiddleware({
      target:
        import.meta.env.VITE_ENV === 'local'
          ? 'http://localhost:8082/'
          : import.meta.env.VITE_API_BASE_URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/vbc-patient',
    createProxyMiddleware({
      target:
        import.meta.env.VITE_ENV === 'local'
          ? 'http://localhost:8083/'
          : import.meta.env.VITE_API_BASE_URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/vbc-notification',
    createProxyMiddleware({
      target:
        import.meta.env.VITE_ENV === 'local'
          ? 'http://localhost:8085/'
          : import.meta.env.VITE_API_BASE_URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/vbc-document',
    createProxyMiddleware({
      target:
        import.meta.env.VITE_ENV === 'local'
          ? 'http://localhost:8087/'
          : import.meta.env.VITE_API_BASE_URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/vbc-doctor',
    createProxyMiddleware({
      target:
        import.meta.env.VITE_ENV === 'local'
          ? 'http://localhost:8089/'
          : import.meta.env.VITE_API_BASE_URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/vbc-patient-data',
    createProxyMiddleware({
      target:
        import.meta.env.VITE_ENV === 'local'
          ? 'http://localhost:8000/'
          : import.meta.env.VITE_API_BASE_URL,
      changeOrigin: true,
    })
  );
};
