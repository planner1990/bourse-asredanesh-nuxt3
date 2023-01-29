import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

export default defineNuxtPlugin(async ({ vueApp }) => {
  //TODO Attach to error handler and else...
  const router = useRouter();
  Sentry.init({
    app: vueApp,
    dsn: "https://48c2f414cc9340b7aabbcff805510392@sentry.asredanesh.com/2",
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: [
          "localhost",
          "bourse.asr24.com",
          "test-bourse.asr24.com"
        ],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
});
