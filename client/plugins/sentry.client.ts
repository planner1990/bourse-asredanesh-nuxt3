import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

export default defineNuxtPlugin(async ({ vueApp }) => {
  //TODO Attach to error handler and else...
  const router = useRouter();
  Sentry.init({
    app: vueApp,
    dsn: "https://0facd7244b6b4a2fb8f9968beb20f58d@sentry.asredanesh.com/6",
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
