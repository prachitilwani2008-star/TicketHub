import { Router } from 'express'
import { createBooking, listMyBookings } from '../controllers/bookingController.js'
import { allowRoles, requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth, allowRoles('attendee'))
router.get('/', listMyBookings)
router.post('/', createBooking)

export default router
