export type EquipmentItem = {
    name: string;
    category: string;
    date: string;
    notes?: string;
    cost: number;
    quantity?: number;
};

export type Session = {
    status: string;
    date: string;
    pic: string;
    id?: string;

};

export type NewItem = {
    category: string;
    cost: number;
    purchaseDate: string;
    note?: string;
    quantity?: number;

}

export type DialogInfo = {
    name: string;
    id: string;
    lastMessage: string;
    lastMessageDateAndTime: string;
    status: 'request' | 'canceled' | 'done';
    avatar?: string;
    phone?: string;
    email?: string;
    location?: string;
    joinDate?: string;
}

export type SessionData = {
    id: string;
    name: string;
    startDate: string;
    notes: string;
    contactNumber: string;
    contactEmail: string;
    pic: string;
  };