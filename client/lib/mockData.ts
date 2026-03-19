import { Booking } from "@shared/api";

export interface ClassPackage {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    creditCount: number;
    validityDays: number;
    eligibleClasses: string[]; // List of class types or IDs this package applies to
}

export interface UserPackageInventory {
    packageId: string;
    remainingCredits: number;
    expiryDate: string;
}

export const AVAILABLE_PACKAGES: ClassPackage[] = [
    {
        id: "pkg_5_class",
        name: "5 Class Pack",
        description: "Perfect for getting started. Valid for 45 days.",
        price: 450,
        currency: "AED",
        creditCount: 5,
        validityDays: 45,
        eligibleClasses: ["Yoga", "Pilates", "Barre"],
    },
    {
        id: "pkg_10_class",
        name: "10 Class Pack",
        description: "Our most popular option. Valid for 90 days.",
        price: 800,
        currency: "AED",
        creditCount: 10,
        validityDays: 90,
        eligibleClasses: ["Yoga", "Pilates", "Barre", "HIIT"],
    },
    {
        id: "pkg_20_class",
        name: "20 Class Pack",
        description: "Best value for committed practitioners. Valid for 180 days.",
        price: 1400,
        currency: "AED",
        creditCount: 20,
        validityDays: 180,
        eligibleClasses: ["ALL"],
    }
];

// Simple in-memory storage for demo purposes
let userInventory: UserPackageInventory[] = [];

export const getPackages = () => AVAILABLE_PACKAGES;

export const getUserInventory = () => userInventory;

export const purchasePackage = (packageId: string) => {
    const pkg = AVAILABLE_PACKAGES.find(p => p.id === packageId);
    if (!pkg) return false;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + pkg.validityDays);

    const newItem: UserPackageInventory = {
        packageId: pkg.id,
        remainingCredits: pkg.creditCount,
        expiryDate: expiryDate.toISOString(),
    };

    userInventory.push(newItem);
    console.log("Package purchased:", newItem);
    return true;
};

export const redeemCredit = (packageId: string) => {
    const itemIndex = userInventory.findIndex(i => i.packageId === packageId && i.remainingCredits > 0);
    if (itemIndex === -1) return false;

    userInventory[itemIndex].remainingCredits--;
    console.log("Credit redeemed. Remaining:", userInventory[itemIndex].remainingCredits);
    return true;
};

export const MOCK_BOOKINGS: Booking[] = [
    {
        id: "b1",
        serviceType: "Class",
        serviceName: "Morning Hatha Yoga",
        startTime: new Date(Date.now() + 15 * 3600000).toISOString(), // 15 hours from now (can cancel)
        endTime: new Date(Date.now() + 16 * 3600000).toISOString(),
        status: "Booked",
    },
    {
        id: "b2",
        serviceType: "Class",
        serviceName: "Vinyasa Flow",
        startTime: new Date(Date.now() + 5 * 3600000).toISOString(), // 5 hours from now (cannot cancel)
        endTime: new Date(Date.now() + 6 * 3600000).toISOString(),
        status: "Booked",
    },
    {
        id: "b3",
        serviceType: "Class",
        serviceName: "Mat Pilates",
        startTime: new Date(Date.now() - 30 * 3600000).toISOString(), // 30 hours ago
        endTime: new Date(Date.now() - 29 * 3600000).toISOString(),   // finished 29 hours ago (can complain)
        status: "Used",
    },
    {
        id: "b4",
        serviceType: "Personal Training",
        serviceName: "1-on-1 Boxing",
        startTime: new Date(Date.now() - 5 * 3600000).toISOString(),  // 5 hours ago
        endTime: new Date(Date.now() - 4 * 3600000).toISOString(),    // finished 4 hours ago (cannot complain yet)
        status: "Used",
    }
];

export const getBookings = () => MOCK_BOOKINGS;
