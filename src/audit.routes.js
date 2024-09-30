import { Router } from 'express'
import { createAudit, getAudits } from './audit.controller.js'

const api = Router()

api.post('/audit', createAudit)
api.get('/audit', getAudits)

export default api
