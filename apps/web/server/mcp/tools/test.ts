import { defineMcpTool } from '@nuxtjs/mcp-toolkit/server'
import { z } from 'zod'

export default defineMcpTool({
  name: 'test',
  description: 'A simple test tool',
  inputSchema: {
    message: z.string(),
  },
  handler: async ({ message }) => `Test successful: ${message}`,
})
