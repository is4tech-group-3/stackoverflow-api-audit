import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import auditRoutes from '../src/audit.routes.js'

const app = express()
config()

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/api/v1', auditRoutes)

export const innitServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
}
