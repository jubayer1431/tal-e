import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import connectDb from './mongodb/connection.js';
import postRoutes from './routes/postRoutes.js';
import taleRoutes from './routes/taleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// create app.use post and tale routes
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/tale', taleRoutes);

await connectDb();

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
