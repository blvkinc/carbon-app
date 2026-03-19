export type ServiceType = 
    | 'Class' 
    | 'Personal Training' 
    | 'Court Rental' 
    | 'Event' 
    | 'Workshop' 
    | 'Course' 
    | 'Retreat';

export interface ServicePolicy {
    type: ServiceType;
    cancellationWindowHours: number; // Hours before start
    complaintWaitHours: number;      // Hours after end
}

export const SERVICE_POLICIES: Record<ServiceType, ServicePolicy> = {
    'Class': {
        type: 'Class',
        cancellationWindowHours: 12,
        complaintWaitHours: 24
    },
    'Personal Training': {
        type: 'Personal Training',
        cancellationWindowHours: 24,
        complaintWaitHours: 12
    },
    'Court Rental': {
        type: 'Court Rental',
        cancellationWindowHours: 6,
        complaintWaitHours: 24
    },
    'Event': {
        type: 'Event',
        cancellationWindowHours: 48,
        complaintWaitHours: 24
    },
    'Workshop': {
        type: 'Workshop',
        cancellationWindowHours: 24,
        complaintWaitHours: 24
    },
    'Course': {
        type: 'Course',
        cancellationWindowHours: 72,
        complaintWaitHours: 48
    },
    'Retreat': {
        type: 'Retreat',
        cancellationWindowHours: 168, // 7 days
        complaintWaitHours: 48
    }
};
