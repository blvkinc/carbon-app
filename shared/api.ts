/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */

export interface DemoResponse {
  message: string;
}

export type ComplaintStatus = 'Pending' | 'PassedToAdmin' | 'Refunded' | 'Rejected';

export interface Complaint {
    id: string;
    bookingId: string;
    userId: string;
    reason: string;
    status: ComplaintStatus;
    createdAt: string;
    updatedAt: string;
}

export interface Booking {
    id: string;
    serviceType: string;
    serviceName: string;
    startTime: string; // ISO string
    endTime: string;   // ISO string
    status: 'Booked' | 'Used' | 'Cancelled' | 'Refunded';
}
