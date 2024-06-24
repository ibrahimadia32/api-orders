import { Request, Response } from 'express';
import { OrderModel } from 'src/models/order';
import { errorHandler } from 'src/helper/errorHelper';

export default class OrderController {
    static async addOrder(req: Request, res: Response) {
        try {
            const order = await OrderModel.addOrder(req.body);
            res.status(201).json(order);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }

    static async updateOrder(req: Request, res: Response) {
        try {
            const order = await OrderModel.updateOrder(req.params.id, req.body);
            res.status(200).json(order);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }

    static async deleteOrder(req: Request, res: Response) {
        try {
            const order = await OrderModel.deleteOrder(req.params.id);
            res.status(200).json(order);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }

    static async getOrders(req: Request, res: Response) {
        try {
            const orders = await OrderModel.getOrders();
            res.status(200).json(orders);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }

    static async getOrderById(req: Request, res: Response) {
        try {
            const order = await OrderModel.getOrderById(req.params.id);
            res.status(200).json(order);
        } catch (err) {
            errorHandler(req, res, err);
        }
    }
}
