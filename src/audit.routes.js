import { Router } from 'express'
import { token } from '../middlewares/token.js'
import { createAudit, getAudits } from './audit.controller.js'

const api = Router()

api.post('/audit', createAudit)
api.get('/audit', [token], getAudits)

export default api
