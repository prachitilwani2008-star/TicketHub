import { Router } from 'express'
import { getPublicEvent, listPublicEvents } from '../controllers/eventController.js'

const router = Router()

router.get('/', listPublicEvents)
router.get('/:eventId', getPublicEvent)

export default router
