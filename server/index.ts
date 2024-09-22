import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipeRoutes.ts';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/recipes', recipeRoutes)

app.get('/', (req, res) => {
  res.send('Serving is ready!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})