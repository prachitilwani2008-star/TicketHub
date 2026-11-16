import { Router } from 'express'
import { getCurrentUser, login, register } from '../controllers/authController.js'
import { allowRoles, requireAuth } from '../middleware/auth.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', requireAuth, getCurrentUser)
router.get('/organizer-check', requireAuth, allowRoles('organizer'), (_request, response) => {
  response.status(200).json({ message: 'Organizer access granted.' })
})
router.get('/attendee-check', requireAuth, allowRoles('attendee'), (_request, response) => {
  response.status(200).json({ message: 'Attendee access granted.' })
})

export default router
