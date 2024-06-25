import { Schema, model } from 'mongoose';
import { IOrder, IOderModel } from 'src/interfaces/order';
import { Status, Address } from 'src/types/order';

const addressSchema = new Schema<Address>(
    {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
    },
    { _id: false }
);

const orderSchema = new Schema<IOrder>({
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.pending,
    },
    products: [
        {
            type: Schema.Types.ObjectId,
        },
    ],
    customer: {
        type: Schema.Types.ObjectId,
    },
    shippingAddress: {
        type: addressSchema,
        required: true,
    },
    billingAddress: {
        type: addressSchema,
    },
});

orderSchema.statics.addOrder = async function (order) {
    return this.create(order);
};

orderSchema.statics.updateOrder = async function (id, order) {
    return this.findByIdAndUpdate(id, order, { new: true });
};

orderSchema.statics.deleteOrder = async function (id) {
    return this.findByIdAndDelete(id);
};

orderSchema.statics.getOrders = async function () {
    return this.find();
};

orderSchema.statics.getOrderById = async function (id) {
    return this.findById(id);
};

export const OrderModel = model<IOrder, IOderModel>('Order', orderSchema);
