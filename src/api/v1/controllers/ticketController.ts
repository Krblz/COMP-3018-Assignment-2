import { Request, Response } from "express";
import { getAllTicketsService, getTicketService, createTicketService, updateTicketService, deleteTicketService } from "../services/ticketService"
import { HTTP_STATUS } from "src/constants/httpConstants";


export const getAllTickets = (req: Request, res: Response) => {
    // Logic to get all tickets
    let result = getAllTicketsService()
     res.status(HTTP_STATUS.OK).json(result);
};

export const getTicket = (req: Request, res: Response) => {
    // Logic to get one ticket
    let id = Number(req.params.id) 

    if (Number.isNaN(id)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ error: "Id must be numerical" });
        return;
    }

    let result = getTicketService(id)

    if (result === undefined) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: `Event with ${id} not found` });
    }

    res.status(HTTP_STATUS.OK).json(result);
};

export const createTicket = (req: Request, res: Response) => {
    // Logic to create a new ticket
    res.status(201).send("Create a new ticket");
};

export const updateTicket = (req: Request, res: Response) => {
    // Logic to update an ticket
    res.status(200).send("Update an ticket");
};

export const deleteTicket = (req: Request, res: Response) => {
    // Logic to delete an ticket
    res.status(200).send("Delete an ticket");
};
