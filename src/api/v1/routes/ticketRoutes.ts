import { Router } from 'express';
import { getAllTickets, getTicket, getTicketUrgency, createTicket, updateTicket, deleteTicket } from "../controllers/ticketController"

const router: Router = Router();

// Define routes
router.get('/tickets', getAllTickets);
router.get('/tickets/:id', getTicket);
router.get('/tickets/:id/urgency', getTicketUrgency);
router.post('/tickets', createTicket);
router.put('/tickets/:id', updateTicket);
router.delete('/tickets/:id', deleteTicket);

export default router;