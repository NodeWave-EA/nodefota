import { submitIndexNow } from '../utils/indexnow'

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('ai-ready:page:indexed', async (ctx) => {
    if (!ctx.contentChanged)
      return

    const { indexNowKey, indexNowSiteUrl } = useRuntimeConfig()
    await submitIndexNow([ctx.route], {
      key: indexNowKey,
      siteUrl: indexNowSiteUrl,
    })
  })
})
