import { getTicketUrgencyService } from "../src/api/v1/services/ticketService";

describe("getTicketUrgencyService", () => {
    it("should return undefined for non-existent ticket", () => {
        const result = getTicketUrgencyService(999);
        expect(result).toBeUndefined();
    });

    it("should calculate urgency based on existing ticket data", () => {
        let id = 1;

        const result = getTicketUrgencyService(id);

        expect(result).toHaveProperty("urgencyScore");
        expect(result).toHaveProperty("urgencyLevel");
    });

    it("should return minimal when ticket is resolved", () => {
        let id = 7;

        const result = getTicketUrgencyService(id);

        expect(result.urgencyScore).toBe(0);
        expect(result.urgencyLevel).toBe("Minimal. Ticket resolved.");

    });
});