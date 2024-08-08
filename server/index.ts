import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api')

app.get('/', (req, res) => {
  res.send('Serving is ready!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})