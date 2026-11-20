import { Router } from 'express'
import { getPublicEvent, listPublicEvents, listPublicTicketTypes } from '../controllers/eventController.js'

const router = Router()

router.get('/', listPublicEvents)
router.get('/:eventId/ticket-types', listPublicTicketTypes)
router.get('/:eventId', getPublicEvent)

export default router
