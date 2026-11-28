import type { ButtonProps } from '@nuxt/ui'
import type { ComponentPublicInstance } from 'vue'
import type { useRoute } from '#app'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

type RouteLocation = ReturnType<typeof useRoute>

export function isNavLinkActive(linkTo: string, currentPath: string): boolean {
  if (!linkTo)
    return false
  if (linkTo === '/')
    return currentPath === '/'
  return currentPath === linkTo || currentPath.startsWith(`${linkTo}/`)
}

export function useNavBubble(
  route: RouteLocation,
  navLinks: ButtonProps[],
) {
  const linkRefs = ref<(HTMLElement | null)[]>([])
  const hoveredIndex = ref<number | null>(null)
  const isReady = ref(false)

  const bubbleStyles = ref<Record<string, string>>({
    transform: 'translateX(0px)',
    width: '0px',
    opacity: '0',
  })

  const setLinkRef = (
    el: Element | ComponentPublicInstance | null,
    index: number,
  ): void => {
    if (!el) {
      linkRefs.value[index] = null
      return
    }

    linkRefs.value[index] = '$el' in el
      ? (el.$el as HTMLElement)
      : (el as HTMLElement)
  }

  const updateBubblePosition = async (): Promise<void> => {
    await nextTick()

    const activeIndex = navLinks.findIndex(link => isNavLinkActive(link.to, route.path))
    const targetIndex = hoveredIndex.value !== null
      ? hoveredIndex.value
      : activeIndex

    if (targetIndex === -1) {
      bubbleStyles.value = {
        ...bubbleStyles.value,
        opacity: '0',
      }
      return
    }

    const targetEl = linkRefs.value[targetIndex]
    if (!targetEl) {
      bubbleStyles.value = {
        ...bubbleStyles.value,
        opacity: '0',
      }
      return
    }

    bubbleStyles.value = {
      transform: `translateX(${targetEl.offsetLeft}px)`,
      width: `${targetEl.offsetWidth}px`,
      opacity: '1',
    }
    isReady.value = true
  }

  function setHoveredIndex(index: number | null) {
    hoveredIndex.value = index
    void updateBubblePosition()
  }

  let resizeObserver: ResizeObserver | null = null

  onMounted(() => {
    void updateBubblePosition()

    if (import.meta.client && 'fonts' in document) {
      void document.fonts.ready.then(() => {
        void updateBubblePosition()
      })
    }

    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        void updateBubblePosition()
      })

      linkRefs.value.forEach((el) => {
        if (el)
          resizeObserver?.observe(el)
      })
    }
  })

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
  })

  watch(
    () => route.path,
    () => {
      hoveredIndex.value = null
      void updateBubblePosition()
    },
  )

  return {
    setLinkRef,
    setHoveredIndex,
    hoveredIndex,
    isReady,
    bubbleStyles,
    updateBubblePosition,
  }
}
