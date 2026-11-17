import { Router } from 'express'
import {
  cancelOrganizerEvent,
  createOrganizerEvent,
  getOrganizerEvent,
  listOrganizerEvents,
  updateOrganizerEvent,
} from '../controllers/eventController.js'
import { allowRoles, requireAuth } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth, allowRoles('organizer'))
router.get('/', listOrganizerEvents)
router.post('/', createOrganizerEvent)
router.get('/:eventId', getOrganizerEvent)
router.put('/:eventId', updateOrganizerEvent)
router.patch('/:eventId', updateOrganizerEvent)
router.delete('/:eventId', cancelOrganizerEvent)

export default router
