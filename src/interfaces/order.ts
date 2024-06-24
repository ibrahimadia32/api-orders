import { Document, Types, Model } from 'mongoose';
import { Order, OrderAttributes } from 'src/types/order';

export interface IOrder extends Document, Order {
    _id: Types.ObjectId;
}

export interface IOderModel extends Model<IOrder> {
    addOrder(order: OrderAttributes): Promise<IOrder>;
    updateOrder(id: string, order: Partial<OrderAttributes>): Promise<IOrder>;
    deleteOrder(id: string): Promise<IOrder>;
    getOrders(): Promise<IOrder[]>;
    getOrderById(id: string): Promise<IOrder>;
}
