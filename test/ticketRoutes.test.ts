import request from "supertest";
import app from "../src/app";
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
        await request(app).delete("/api/v1/tickets/7");

        expect(ticketController.deleteTicket).toHaveBeenCalled();
    });
});

describe("Ticket API Endpoints for Errors", () => {
    it("should return 400 error for missing priority", async () => {
        // Arrange
        const incompleteTicket = {
            title: "Test Title",
            description: "Test Description"
        };

        // Act
        const result = await request(app).post("/api/v1/tickets").send(incompleteTicket);

        // Assert
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty("error");
        expect(result.body.error).toContain("Invalid priority. Must be one of: critical, high, medium, low");
    });

    it("should return 404 error for ticket not found", async () => {
        const result = await request(app).get("/api/v1/tickets/999");

        expect(result.status).toBe(404);
        expect(result.body).toHaveProperty("error");
        expect(result.body.error).toContain("Ticket not found");
    });

    it("should return 400 error for invalid status", async () => {
        // Arrange
        const invalidUpdate = {
            title: "Updated Title",
            description: "Updated Description",
            status: "okay"
        };
        // Act
        const result = await request(app).post("/api/v1/tickets").send(incompleteTicket);

        // Assert
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty("error");
        expect(result.body.error).toContain("Invalid status. Must be one of: open, in-progress, resolved");
    });

    it("should call deleteTicket controller", async () => {
        await request(app).delete("/api/v1/tickets/7");

        expect(ticketController.deleteTicket).toHaveBeenCalled();
    });
});