import { tickets } from "src/data/ticketData"

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
    ): string => {
    return "Ticket Updated";
};

export const deleteTicketService = (id: number) => {
    let ticketToDelete = tickets.findIndex(x => x.id === id);

    if (-1) {
        return;
    }

    tickets.splice(ticketToDelete, 1)
    return;
}