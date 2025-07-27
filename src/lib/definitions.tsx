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
    days?: number;
};

export type NewItem = {
    category: string;
    cost: number;
    purchaseDate: string;
    note?: string;
    quantity?: number;

}