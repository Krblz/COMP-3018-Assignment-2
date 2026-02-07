import { Request, Response } from "express";
import { getAllTicketsService, getTicketService, getTicketUrgencyService, createTicketService, updateTicketService, deleteTicketService } from "../services/ticketService"
import {HTTP_STATUS} from "../../../constants/httpConstants"

export const getAllTickets = (req: Request, res: Response) => {
    let result = getAllTicketsService()
    res.status(HTTP_STATUS.OK).json({ message: "Tickets retrieved", data: result });
};

export const getTicket = (req: Request, res: Response) => {
    let id = Number(req.params.id) 

    isValidId(id, res)

    let result = getTicketService(id)

    if (result === undefined) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: `Event with ${id} not found` });
    }

    res.status(HTTP_STATUS.OK).json({ message: "Ticket retrieved" , data: result});
};

export const getTicketUrgency = (req: Request, res: Response) => {
    let id = Number(req.params.id) 

    isValidId(id, res)

    let result = getTicketUrgencyService(id)

    if (result === undefined) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: `Ticket not found` });
    }

    res.status(HTTP_STATUS.OK).json({ message: "Ticket urgency calculated" , data: result});
};

export const createTicket = (req: Request, res: Response) => {
    let newTicket = req.body

    let result = createTicketService(newTicket)
    res.status(HTTP_STATUS.CREATED).json({ message: result });
};

export const updateTicket = (req: Request, res: Response) => {
    let id = Number(req.params.id);
    let { title, description, priority, status, createdAt } = req.body;

    isValidId(id, res)

    let result = updateTicketService(title, description, priority, status, createdAt);
    res.status(HTTP_STATUS.CREATED).json({ message: result });
};

export const deleteTicket = (req: Request, res: Response) => {
    let id = Number(req.params.id);

    isValidId(id, res)

    let result = deleteTicketService(id);
    res.status(HTTP_STATUS.OK).json({ message: result });
};

/**
 * Function for Validating ID
 * @param id 
 * @param res 
 * @returns
 */
function isValidId(id: number, res: Response): any {
    if (Number.isNaN(id)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Id must be numerical" });
        return;
    }
}