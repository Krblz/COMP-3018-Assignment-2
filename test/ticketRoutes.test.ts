import request from "supertest";
import app from "../src/api";
import * as ticketController from "../src/api/v1/controllers/ticketController";

jest.mock("../src/api/v1/controllers/ticketController", () => ({
    getAllTickets: jest.fn((req, res) => res.status(200).send()),
    getTicket: jest.fn((req, res) => res.status(200).send()),
    getTicketUrgency: jest.fn((req, res) => res.status(200).send()),
    createTicket: jest.fn((req, res) => res.status(201).send()),
    updateTicket: jest.fn((req, res) => res.status(200).send()),
    deleteTicket: jest.fn((req, res) => res.status(200).send()),
}));

describe("Ticket API Endpoints", () => {
    it("should call createTicket controller", async () => {
        // Arrange
        const mockTicket = {
            title: "Test Title",
            description: "Test Description",
            priority: "low"
        };

        // Act
        await request(app).post("/api/v1/tickets").send(mockTicket);

        // Assert
        expect(ticketController.createTicket).toHaveBeenCalled();
    });

    it("should call getAllTickets controller", async () => {
        await request(app).get("/api/v1/tickets");

        expect(ticketController.getAllTickets).toHaveBeenCalled();
    });

    it("should call updateTicket controller", async () => {
        const mockItem = {
            title: "Updated Title",
            description: "Updated Description",
            priority: "low"
        };
        await request(app).put("/api/v1/tickets/1").send(mockItem);

        expect(ticketController.updateTicket).toHaveBeenCalled();
    });

    it("should call deleteTicket controller", async () => {
        await request(app).delete("/api/v1/events/7");

        expect(ticketController.deleteTicket).toHaveBeenCalled();
    });
});