import { tickets } from "../../../data/ticketData"

export interface Ticket {
    "id": number,
    "title": string,
    "description": string,
    "priority": string,
    "status": string,
    "createdAt": string
}

export const getAllTicketsService = (): Ticket[] => {
    return tickets;
};

export const getTicketService = (id: number): Ticket | undefined => {
    let ticket = tickets.find(x => x.id === id)
    return ticket;
};

export const createTicketService = (newTicket: Ticket): Ticket => {
    tickets.push(newTicket)
    return newTicket;
};

export const updateTicketService = (
        id: number, 
        title?: string,
        description?: string,
        priority?: string,
        status?: string,
        createdAt?: string
    ): Ticket | undefined => {
    let ticket = tickets.find(x => x.id === id);

    if (!ticket) {
        return undefined;
    }

    if (title !== undefined) ticket.title = title;
    if (description !== undefined) ticket.description = description;
    if (priority !== undefined) ticket.priority = priority;
    if (status !== undefined) ticket.status = status;
    if (createdAt !== undefined) ticket.createdAt = createdAt;
    
    return ticket;
};

export const deleteTicketService = (id: number): string => {
    let ticketToDelete = tickets.findIndex(x => x.id === id);

    if (ticketToDelete === -1) {
        return "Ticket not found";
    }

    tickets.splice(ticketToDelete, 1)
    return "Ticket deleted";
}