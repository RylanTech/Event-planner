import { Router } from 'express';
import { createEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from '../controllers/eventController';

const router = Router();

router.get("/", getAllEvents)
router.get("/:eventId", getEvent)
router.post("/", createEvent)
router.put("/:eventId", updateEvent)
router.delete("/:eventId", deleteEvent)

export default router;