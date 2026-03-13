import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

// Health check route
fastify.get('/', async () => {
  return { hello: 'world' }
})

// Start server
const start = async () => {
  try {
    const port = 8081
    await fastify.listen({ port, host: '0.0.0.0' })
    console.log(`Server listening on http://localhost:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
