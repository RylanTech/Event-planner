import { Router } from 'express';
import { createEvent, deleteEvent, getAllEvents, getEvent, getTenEvents, updateEvent } from '../controllers/eventController';

const router = Router();

router.get("/:query", getTenEvents)

export default router;