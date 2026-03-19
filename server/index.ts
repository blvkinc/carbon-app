import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleGetComplaints, handleCreateComplaint, handlePassToAdmin, handleComplaintDecision } from "./routes/complaints";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Complaint Routes
  app.get("/api/complaints", handleGetComplaints);
  app.post("/api/complaints", handleCreateComplaint);
  app.patch("/api/complaints/:id/pass-to-admin", handlePassToAdmin);
  app.patch("/api/complaints/:id/decide", handleComplaintDecision);

  return app;
}
