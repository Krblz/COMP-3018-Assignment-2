import { tickets } from "../../../data/ticketData"

export interface Ticket {
    "id": number,
    "title": string,
    "description": string,
    "priority": string,
    "status": string,
    "createdAt": string
}

const urgencyBaseScore = (
    type: "critical" | "high" | "medium" | "low"
): number => {
    switch (type) {
        case "critical":
            return 50;
        case "high":
            return 30;
        case "medium":
            return 20;
        case "low":
            return 10;
        default:
            return 0;
    }
};

// Array for Ticket Age, Array Starts at 0, Ticket Data starts at 1
const ticketAge: number[] = [0, 3, 2, 6, 5, 9, 6, 10];

export const getAllTicketsService = (): Ticket[] => {
    return tickets;
};

export const getTicketService = (id: number): Ticket | undefined => {
    let ticket = tickets.find(x => x.id === id)
    return ticket;
};

export const getTicketUrgencyService = (id: number): any => {
    let ticket = tickets.find(x => x.id === id);
    let urgencyScore;
    let urgencyLevel;

    if (!ticket) {
        return undefined;
    }

    let baseScore = urgencyBaseScore(ticket.priority as "critical" | "high" | "medium" | "low");

    if (ticket.status === "resolved") {
        urgencyScore = 0;
        urgencyLevel = "Minimal. Ticket resolved." 
    } 
    else if (ticket.status === "open") {
        urgencyScore = baseScore + (ticketAge[id] * 5);
        urgencyLevel = urgencyScore <= 25 ?
                            "Low urgency. Address when capacity allows.":
                        urgencyScore <= 50 ?
                            "Moderate. Schedule for attention.":
                        urgencyScore <= 75 ?
                            "High urgency. Prioritize resolution.":
                        // urgencyScore is higher than 80
                        "High urgency. Prioritize resolution.";
    }

    return {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: ticket.createdAt,
        ticketAge: ticketAge[id],
        urgencyScore: urgencyScore,
        urgencyLevel: urgencyLevel
    }
}

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