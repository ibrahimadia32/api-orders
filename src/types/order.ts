import { Types } from 'mongoose';

export enum Status {
    pending = 'pending',
    processing = 'processing',
    completed = 'completed',
    cancelled = 'cancelled',
    shipped = 'shipped',
    delivered = 'delivered',
}

export type Address = {
    street: string;
    city: string;
    state: string;
    zip: string;
};

export type Order = {
    status: Status;
    products: Types.ObjectId[];
    customer: Types.ObjectId;
    shippingAddress: Address;
    billingAddress?: Address;
};
export type OrderAttributes = Omit<Order, 'customer' | 'products'> & {
    customer: string;
    products: string[];
};
