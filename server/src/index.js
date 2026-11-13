import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 5055

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    message: 'API connected',
  })
})

app.listen(port, () => {
  console.log(`TicketHub API is running at http://localhost:${port}`)
})
