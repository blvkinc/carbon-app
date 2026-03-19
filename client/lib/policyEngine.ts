import { Booking } from "@shared/api";
import { SERVICE_POLICIES, ServiceType } from "@shared/policies";

/**
 * Checks if a booking can be cancelled based on its service type policy.
 * @param booking The booking object
 * @returns boolean
 */
export const canCancelBooking = (booking: Booking): boolean => {
    if (booking.status !== 'Booked') return false;

    const policy = SERVICE_POLICIES[booking.serviceType as ServiceType];
    if (!policy) return true; // Default to allowing if no policy found (or handle as error)

    const startTime = new Date(booking.startTime).getTime();
    const now = Date.now();
    const hoursToStart = (startTime - now) / (1000 * 60 * 60);

    return hoursToStart >= policy.cancellationWindowHours;
};

/**
 * Checks if a complaint can be made for a booking.
 * Must be after the service is finished and after the mandatory wait time.
 * @param booking The booking object
 * @returns boolean
 */
export const canMakeComplaint = (booking: Booking): boolean => {
    // Only allow complaints for Used bookings (or potentially those that were 'Booked' but not properly handled)
    if (booking.status !== 'Used' && booking.status !== 'Booked') return false;

    const policy = SERVICE_POLICIES[booking.serviceType as ServiceType];
    if (!policy) return false;

    const endTime = new Date(booking.endTime).getTime();
    const now = Date.now();
    const hoursSinceFinish = (now - endTime) / (1000 * 60 * 60);

    return hoursSinceFinish >= policy.complaintWaitHours;
};

/**
 * Returns a human readable policy message.
 */
export const getCancellationPolicyMessage = (type: ServiceType): string => {
    const policy = SERVICE_POLICIES[type];
    if (!policy) return "";
    return `Cancellation must be done at least ${policy.cancellationWindowHours} hours before the session starts.`;
};

export const getComplaintPolicyMessage = (type: ServiceType): string => {
    const policy = SERVICE_POLICIES[type];
    if (!policy) return "";
    return `Complaints can be raised ${policy.complaintWaitHours} hours after the session is completed.`;
};
