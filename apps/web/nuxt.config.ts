import process from 'node:process'

/** https://nuxt.com/docs/api/configuration/nuxt-config */
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@vueuse/nuxt/module',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxt/icon/module',
    '@nuxt/hints',
    '@nuxt/a11y',
    '@nuxt/scripts',
    '@nuxtjs/turnstile',
    '@nuxtjs/mcp-toolkit',
    '@nuxtjs/supabase',
  ],

  devtools: {
    enabled: true,
  },

  vite: {
    server: {
      allowedHosts: [
        'web.127.0.0.1.nip.io',
        'web.localhost',
        'supabase.127.0.0.1.nip.io',
        'supabase.localhost',
        'api.127.0.0.1.nip.io',
        'api.localhost',
      ],
    },
  },

  app: {
    head: {
      titleTemplate: '%s - Secure IoT FOTA Platform',
      title: 'NODEFOTA - Zero-Trust Over-The-Air Firmware Management',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'description',
          content: 'Enterprise-grade wireless firmware updates, cryptographic differential patching, and dual-bank rollback safety for millions of IoT devices.',
        },
        { name: 'theme-color', content: '#02192b' },
        { name: 'msapplication-TileColor', content: '#02192b' },
        { name: 'msapplication-TileImage', content: '/icons/favicon-144x144.png' },
        { name: 'msapplication-config', content: '/icons/browserconfig.xml' },
        { name: 'application-name', content: 'NODEFOTA' },
        { name: 'apple-mobile-web-app-title', content: 'NODEFOTA' },
      ],
      link: [
        // Legacy & SVG Favicons
        { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' },
        { rel: 'shortcut icon', href: '/icons/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon.svg' },

        // Standard PNG Favicons
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/icons/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/icons/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: '/icons/favicon-96x96.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: '/icons/favicon-192x192.png',
        },

        { rel: 'apple-touch-icon', sizes: '57x57', href: '/icons/favicon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/icons/favicon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/icons/favicon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/icons/favicon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/icons/favicon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/icons/favicon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/icons/favicon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/favicon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/favicon-180x180.png' },

        { rel: 'manifest', href: '/icons/manifest.json' },
      ],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2026-06-30',

  site: {
    name: 'NODEFOTA',
    url: process.env.NUXT_PUBLIC_SITE_URL,
    description: 'Secure firmware over-the-air updates for IoT devices. Manage ESP32/ESP8266 fleets with confidence.',
    defaultLocale: 'en',
    trailingSlash: false,
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
  },

  runtimeConfig: {
    indexNowKey: process.env.NUXT_INDEX_NOW_KEY,
    indexNowSiteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    public: {
      turnstileSiteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      apiBaseUrl: process.env.NUXT_PUBLIC_API_URL,
      supabase: {
        url: process.env.SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL,
        key: process.env.SUPABASE_KEY || process.env.NUXT_PUBLIC_SUPABASE_KEY,
      },
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  icon: {
    class: 'nuxt-icon',
    size: '1.2em',
    serverBundle: 'auto',
  },

  ui: {
    experimental: {
      componentDetection: true,
    },
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
    },
    families: [
      {
        name: 'Inter',
        weights: [400, 500, 600, 700],
      },
      {
        name: 'JetBrains Mono',
        weights: [400, 500, 600, 700],
      },
    ],
  },

  aiReady: {
    database: {
      type: process.env.NODE_ENV === 'production'
        ? 'neon'
        : 'sqlite',
      url: process.env.NUXT_AI_READY_DATABASE_URL,
    },
    autoI18n: true,
    runtimeSync: {
      ttl: 3600,
      batchSize: 50,
      pruneTtl: 0,
    },
    cron: true,
  },

  supabase: {
    url: process.env.SUPABASE_URL || process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.SUPABASE_KEY || process.env.NUXT_PUBLIC_SUPABASE_KEY,
    types: '~/types/supabase.db.types.ts',
    useSsrCookies: true,
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    },
    redirect: true,
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/callback',
      include: ['/dashboard', '/dashboard/**'],
      exclude: [
        '/',
        '/features',
        '/security',
        '/integrations',
        '/about',
        '/contact',
        '/auth/**',
      ],
      saveRedirectToCookie: true,
    },
  },

  mcp: {
    name: 'NODEFOTA MCP',
    route: '/mcp', // Default route for the MCP server
    dir: 'mcp', // Base directory for MCP definitions (relative to server/)
  },

  routeRules: {
    '/auth/**': { robots: false },
    '/dashboard/**': { robots: false },
  },

  // prerender: {
  //   crawlLinks: true,
  //   routes: ['/sitemap.xml', '/robots.txt'],
  // },

  experimental: {
    payloadExtraction: true,
    viewTransition: true,
    defaults: {
      nuxtLink: {
        trailingSlash: 'remove',
        prefetch: true,
      },
    },
  },

  nuxtseo: {
    enabled: true,
    tips: true,
  },

  robots: {
    enabled: true,
    debug: process.env.NODE_ENV !== 'production',
    header: true,
    metaTag: true,
    groups: [
      {
        userAgent: '*',
        allow: ['/'],
        contentUsage: {
          'bots': 'y',
          'train-ai': 'y',
          'ai-output': 'y',
          'search': 'y',
        },
        contentSignal: {
          'search': 'yes',
          'ai-input': 'yes',
          'ai-train': 'yes',
        },
      },
    ],
  },

  schemaOrg: {
    enabled: true,
    defaults: true,
    minify: process.env.NODE_ENV === 'production',
  },

  seo: {
    enabled: true,
    automaticDefaults: true,
    automaticOgAndTwitterTags: true,
    automaticTwitterTags: true,
    canonicalLowercase: true,
    canonicalQueryWhitelist: [],
    redirectToCanonicalSiteUrl: true,
    meta: {
      ogLocale: 'en_KE',
      twitterCard: 'summary_large_image',
    },
  },

  sitemap: {
    enabled: true,
    autoI18n: true,
    discoverImages: true,
    discoverVideos: true,
    sitemapName: 'sitemap.xml',
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
    },
  },

  skewProtection: {
    enabled: true,
  },

  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
  },
})
