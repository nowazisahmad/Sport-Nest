export type TBooking = {
    _id: string;
    facilityId: string;
    facilityName: string;
    date: string; // yyyy-MM-dd
    startTime: string; // HH:mm
    hours: number;
    players: number;
    name: string;
    email: string;
    photo?: string;
    totalPrice: number;
    status: string;
};
