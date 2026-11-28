export default defineAppConfig({
  ui: {
    colors: {
      primary: 'cyan',
      secondary: 'indigo',
      success: 'emerald',
      info: 'sky',
      warning: 'amber',
      error: 'rose',
      neutral: 'slate',
    },
    strategy: 'override',

    container: {
      base: 'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8',
    },

    header: {
      slots: {
        root: 'sticky top-0 z-50 w-full border-b border-default bg-default/85 backdrop-blur-md transition-colors duration-300',
        container: 'w-full max-w-(--ui-container) mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4',
        left: 'flex items-center justify-start min-w-0 shrink lg:flex-1 lg:basis-0',
        center: 'hidden lg:flex items-center justify-center shrink-0',
        right: 'flex items-center justify-end gap-2 shrink-0 lg:flex-1 lg:basis-0',
        title: 'shrink-0 inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xs',
        toggle: 'lg:hidden rounded-xs border border-transparent hover:border-default hover:bg-elevated text-default transition-colors cursor-pointer',
        content: 'lg:hidden bg-default border-l border-default',
        overlay: 'lg:hidden bg-slate-950/60 backdrop-blur-xs',
        header: 'px-4 sm:px-6 h-16 shrink-0 flex items-center justify-between gap-3 border-b border-default bg-default',
        body: 'p-4 sm:p-6 overflow-y-auto bg-default flex-1',
      },
      variants: {
        toggleSide: {
          left: {
            toggle: '-ms-1.5',
          },
          right: {
            toggle: '-me-1.5',
          },
        },
      },
    },

    footer: {
      slots: {
        root: 'border-t border-default bg-default/80 backdrop-blur-sm p-0 m-0',
        container: 'p-0 max-w-none',
      },
    },

    pageHeader: {
      slots: {
        root: 'relative border-b border-default py-8 mb-8 sm:mb-10',
        wrapper: 'flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4',
        headline: 'mb-3 font-mono text-xs font-bold uppercase tracking-widest text-primary',
        title:
          'font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-highlighted leading-[1.1]',
        description:
          'mt-4 font-sans text-sm sm:text-base md:text-lg text-muted max-w-3xl leading-relaxed',
        links: 'flex flex-wrap items-center gap-2 mt-4 lg:mt-0',
      },
    },

    pageBody: {
      base: 'mt-6 pb-4 space-y-8',
    },

    button: {
      defaultVariants: {
        size: 'md',
        color: 'primary',
      },
      slots: {
        base: 'inline-flex items-center justify-center rounded-xs font-medium transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-60 aria-disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      },
    },

    badge: {
      defaultVariants: {
        variant: 'subtle',
        size: 'md',
      },
      slots: {
        base: 'inline-flex items-center rounded-xs font-mono font-bold tracking-wider uppercase',
      },
    },

    kbd: {
      base: 'inline-flex items-center justify-center px-1.5 rounded-xs border border-default bg-elevated font-mono font-medium text-muted shadow-2xs',
    },

    skeleton: {
      base: 'animate-pulse rounded-xs bg-elevated',
    },

    input: {
      defaultVariants: {
        size: 'lg',
      },
      slots: {
        root: 'relative inline-flex items-center transition-all duration-200 rounded-xs',
      },
    },

    select: {
      slots: {
        base: 'rounded-xs',
      },
    },

    textarea: {
      slots: {
        base: 'rounded-xs',
      },
    },

    avatar: {
      defaultVariants: {
        size: 'md',
      },
      slots: {
        root: 'inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-xs bg-elevated ring-1 ring-default',
      },
    },

    tooltip: {
      slots: {
        content:
          'z-50 flex items-center gap-1 rounded-xs border border-default bg-elevated px-2.5 py-1 font-mono text-xs text-highlighted shadow-md delay-200 select-none',
      },
    },

    navigationMenu: {
      slots: {
        root: 'transition-all duration-200',
      },
    },

    card: {
      slots: {
        root: 'rounded-xs border border-default bg-elevated/85 backdrop-blur-xs shadow-xs transition-all duration-300 overflow-hidden',
        header: 'p-4 sm:px-6 border-b border-default bg-muted/40',
        body: 'flex flex-col gap-4 p-4 sm:p-6',
        footer: 'p-4 sm:px-6 border-t border-default bg-muted/30',
      },
    },

    modal: {
      slots: {
        content: 'rounded-xs border border-default bg-default shadow-xl',
        overlay: 'bg-slate-950/60 backdrop-blur-xs',
      },
    },

    contentSearch: {
      slots: {
        modal: 'rounded-xs border border-default bg-default shadow-xl overflow-hidden',
      },
    },

    contentToc: {
      slots: {
        root: 'order-first lg:order-none sticky top-[var(--blog-header-offset,var(--ui-header-height))] z-20 bg-default/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b border-default lg:border-b-0 -mx-4 sm:-mx-6 px-4 sm:px-6 lg:mx-0 lg:px-0 overflow-y-auto max-h-[calc(100vh_-_var(--blog-header-offset,var(--ui-header-height)))] transition-[top,max-height] duration-300',
        container: 'pt-2.5 pb-3 lg:py-0 border-b-0',
        trigger: 'font-mono text-xs uppercase tracking-wider text-default py-1.5',
        title: 'font-mono text-[11px] font-bold uppercase tracking-widest text-muted',
        list: 'space-y-0.5',
        link: 'font-mono text-xs py-1 text-muted hover:text-primary data-[active]:text-primary data-[active]:font-semibold transition-colors',
        indicator: 'bg-primary',
      },
    },

    contentSurround: {
      slots: {
        root: 'grid grid-cols-1 sm:grid-cols-2 gap-3',
        link: 'group relative flex flex-col justify-between min-w-0 overflow-hidden p-4 sm:p-5 rounded-xs border border-default bg-default hover:bg-elevated hover:border-primary/50 transition-colors duration-200',
        linkLeading:
          'inline-flex items-center justify-center size-7 rounded-xs border border-default bg-elevated text-muted group-hover:border-primary/40 group-hover:text-primary mb-3 transition-colors',
        linkLeadingIcon: 'size-3.5',
        linkTitle:
          'font-sans font-semibold text-sm text-highlighted group-hover:text-primary transition-colors line-clamp-1',
        linkDescription:
          'font-sans text-xs text-muted line-clamp-2 mt-1 leading-relaxed',
      },
    },

    formField: {
      slots: {
        container: 'flex flex-col gap-1.5',
        help: 'm-0 text-xs text-muted font-medium',
        label: 'font-mono text-xs font-bold text-highlighted',
      },
    },

    link: {
      variants: {
        active: {
          false:
            'text-muted hover:text-primary transition-colors',
        },
      },
    },

    toaster: {
      slots: {
        viewport: 'z-10001 p-4',
      },
    },

    icons: {
      loading: 'i-lucide-loader-circle',
      search: 'i-lucide-search',
      menu: 'i-lucide-menu',
      close: 'i-lucide-x',
    },

    experimental: {
      componentDetection: true,
    },
  },
})
