import express from 'express';
import router from './routes/router';
import { connectDB } from './database/db';
const app = express();

app.use(express.json());
app.use(router);

connectDB()
    .then(() => {
        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    })
    .catch((err) => {
        console.error(err);
    });
