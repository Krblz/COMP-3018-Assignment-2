import { Request, Response } from "express";
import { getAllTicketsService, getTicketService, createTicketService, updateTicketService, deleteTicketService } from "../services/ticketService"
import { HTTP_STATUS } from "src/constants/httpConstants";


export const getAllTickets = (req: Request, res: Response) => {
    let result = getAllTicketsService()
    res.status(HTTP_STATUS.OK).json(result);
};

export const getTicket = (req: Request, res: Response) => {
    let id = Number(req.params.id) 

    isValidId(id, res)

    let result = getTicketService(id)

    if (result === undefined) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: `Event with ${id} not found` });
    }

    res.status(HTTP_STATUS.OK).json(result);
};

export const createTicket = (req: Request, res: Response) => {
    let newTicket = req.body

    let result = createTicketService(newTicket)
    res.status(HTTP_STATUS.CREATED).json(result);
};

export const updateTicket = (req: Request, res: Response) => {
    let id = Number(req.params.id);
    let { title, description, priority, status, createdAt } = req.body;

    isValidId(id, res)

    let result = updateTicketService(title, description, priority, status, createdAt);
    res.status(HTTP_STATUS.CREATED).json(result);
};

export const deleteTicket = (req: Request, res: Response) => {
    let id = Number(req.params.id);

    isValidId(id, res)

    let result = deleteTicketService(id);
    res.status(HTTP_STATUS.OK).json(result);
};

function isValidId(id: number, res: Response): any {
    if (Number.isNaN(id)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Id must be numerical" });
        return;
    }
}