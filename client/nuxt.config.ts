export default defineNuxtConfig({
    ssr: false,
    css: [
        'vuetify/lib/styles/main.sass',
        "@/assets/css/main.css",
        "@/assets/icons/icosax/style.css",
        "@/assets/icons/lotfisax/style.css",
        "@/assets/icons/ada/style.css",
        "@mdi/font/css/materialdesignicons.min.css",
    ],
    modules: [
        "@nuxt/content",
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt'
    ],
    sentry: {
        dsn: 'https://0ce27d5240e4406db758e753ada824fe@o4504546958901248.ingest.sentry.io/4504546962505728', // Enter your project's DSN.
        // Additional Module Options.
        config: {
            // Optional Sentry SDK configuration.
            // Those options are shared by both the Browser and the Server instances.
            // Browser-only and Server-only options should go
            // into `clientConfig` and `serverConfig` objects respectively.
        },
    },
    content: {
        // https://content.nuxtjs.org/api/configuration
    },
    components: {
        global: true,
        dirs: ["~/components"],
    },
    runtimeConfig: {
        public: {
            VUE_APP_I18N_LOCALE: process.env.VUE_APP_I18N_LOCALE,
            VUE_APP_I18N_FALLBACK_LOCALE: process.env.VUE_APP_I18N_FALLBACK_LOCALE,
            VUE_APP_BASE_ROUTE: process.env.VUE_APP_BASE_ROUTE,
            VUE_APP_NAME: process.env.VUE_APP_NAME,
            VUE_APP_Host: process.env.VUE_APP_Host,
            VUE_WSS_Host: process.env.VUE_WSS_Host,
        },
        sentry: {
            config: {
                environment: process.env.SENTRY_ENVIRONMENT
            },
            serverConfig: {
                // Any server-specific config
            },
            clientConfig: {
                // Any client-specific config
            }
        }
    },
    build: {
        transpile: ['vuetify'],
        postcss: {
            postcssOptions: {
                plugins: {
                    "postcss-import": {},
                    "postcss-preset-env": {},
                    "tailwindcss/nesting": {},
                    tailwindcss: {},
                    autoprefixer: {},
                    ...(process.env.NODE_ENV === "production" ? {cssnano: {}} : {}),
                },
            },
        },
    },
    vite: {
        plugins: [],
        define: {
            'process.env.DEBUG': false,
        },
    },
});
