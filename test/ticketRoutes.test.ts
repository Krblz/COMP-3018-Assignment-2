import request from "supertest";
import app from "../src/app";

describe("Ticket API Endpoints", () => {
    it("should call createTicket controller", async () => {
        // Arrange
        const mockTicket = {
            title: "Test Title",
            description: "Test Description",
            priority: "low"
        };

        // Act
        const result = await request(app).post("/api/v1/tickets").send(mockTicket);

        // Assert
        expect(result.status).toBe(201);
    });

    it("should call getAllTickets controller", async () => {
        const result = await request(app).get("/api/v1/tickets");

        expect(result.status).toBe(200);
    });

    it("should call updateTicket controller", async () => {
        // Arrange
        const mockItem = {
            title: "Updated Title",
            description: "Updated Description",
            priority: "low"
        };

        // Act
        const result = await request(app).put("/api/v1/tickets/1").send(mockItem);

        // Assert
        expect(result.status).toBe(200);
    });

    it("should call deleteTicket controller", async () => {
        const result = await request(app).delete("/api/v1/tickets/7");

        expect(result.status).toBe(200);
    });
});

describe("Ticket API Endpoints for Errors", () => {
    it("should return 400 error for missing status", async () => {
        // Arrange
        const incompleteTicket = {
            title: "Test Title"
        };

        // Act
        const result = await request(app).post("/api/v1/tickets").send(incompleteTicket);

        // Assert
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty("error");
        expect(result.body.error).toContain("Missing required: description");
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
        const result = await request(app).put("/api/v1/tickets/1").send(invalidUpdate);

        // Assert
        expect(result.status).toBe(400);
        expect(result.body).toHaveProperty("error");
        expect(result.body.error).toContain("Invalid status. Must be one of: open, in-progress, resolved");
    });

    it("should return 404 error for ticket not found", async () => {
        const result = await request(app).delete("/api/v1/tickets/999");

        expect(result.status).toBe(404);
        expect(result.body).toHaveProperty("message");
        expect(result.body.message).toContain("Ticket not found");
    });
});