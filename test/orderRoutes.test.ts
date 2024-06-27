import request from 'supertest';
import express from 'express';
import router from '../src/routes/router';

const app = express();
app.use(express.json());
app.use(router);

describe('Order Routes Tests', () => {
    describe('GET /orders - Retrieve All Orders', () => {
        test('It should respond with an array of orders', async () => {
            const response = await request(app).get('/orders');
            expect(response.status).toEqual(200);
            expect(Array.isArray(response.body)).toBeTruthy();
            // Additional assertions can be added here
        });
    });

    describe('GET /orders/:id - Retrieve a Specific Order', () => {
        test('It should respond with a single order object', async () => {
            const orderId = 1; // Assuming 1 is a valid order ID for testing
            const response = await request(app).get(`/orders/${orderId}`);
            expect(response.status).toEqual(200);
            expect(typeof response.body).toBe('object');
            // Additional assertions can be added here
        });
    });

    describe('POST /orders - Create a New Order', () => {
        test('It should create a new order and return the created order', async () => {
            const newOrderData = {
                // Example order data
                item: 'Coffee',
                quantity: 2,
                price: 5.00
            };
            const response = await request(app).post('/orders').send(newOrderData);
            expect(response.status).toEqual(201);
            // Additional assertions to verify the response body can be added here
        });
    });
});