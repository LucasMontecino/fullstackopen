import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosisRouter';
import patientRouter from './routes/patientRouter';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.get('/api/ping', (_req, res) => {
  res.send('pong');
  return;
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});
