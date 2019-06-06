import express from 'express'
import bodyParser from 'body-parser'
import locations from './locations/router'
import { DEFAULT_PORT } from './constants'
const app = express();

app.listen(DEFAULT_PORT, ()=>
    console.log(`Server is listening on port ${DEFAULT_PORT}`));
app.use(bodyParser.json());
app.use('/locations', locations);

export default app;