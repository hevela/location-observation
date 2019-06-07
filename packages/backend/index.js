import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import locations from './locations/router'
import { DEFAULT_PORT } from './constants'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();

app.listen(DEFAULT_PORT, ()=>
    console.log(`Server is listening on port ${DEFAULT_PORT}`));
app.use(bodyParser.json());
app.use('/locations', locations);

export default app;