import { RequestHandler } from "express";
import { Complaint, ComplaintStatus } from "@shared/api";

// In-memory store for demo
let complaints: Complaint[] = [];

export const handleGetComplaints: RequestHandler = (req, res) => {
    res.json(complaints);
};

export const handleCreateComplaint: RequestHandler = (req, res) => {
    const { bookingId, userId, reason } = req.body;
    
    const newComplaint: Complaint = {
        id: `c_${Date.now()}`,
        bookingId,
        userId,
        reason,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    
    complaints.push(newComplaint);
    console.log("Complaint created:", newComplaint);
    res.status(201).json(newComplaint);
};

export const handlePassToAdmin: RequestHandler = (req, res) => {
    const { id } = req.params;
    const complaint = complaints.find(c => c.id === id);
    
    if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
    }
    
    complaint.status = 'PassedToAdmin';
    complaint.updatedAt = new Date().toISOString();
    
    console.log("Complaint passed to admin:", complaint);
    res.json(complaint);
};

export const handleComplaintDecision: RequestHandler = (req, res) => {
    const { id } = req.params;
    const { status } = req.body as { status: ComplaintStatus };
    
    const complaint = complaints.find(c => c.id === id);
    if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" });
    }
    
    complaint.status = status;
    complaint.updatedAt = new Date().toISOString();
    
    console.log(`Complaint ${id} decision: ${status}`);
    res.json(complaint);
};
