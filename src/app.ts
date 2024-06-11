import express, { Request, Response } from 'express';
import { findServer } from '../services';

const app = express();

app.get('/', async (req: Request, res: Response) => {
  const resp = await findServer();
  if (resp === 'failed') {
    res.status(500).send('No servers are online')
  } else {
    res.send(resp);
  }
});

export default app;
