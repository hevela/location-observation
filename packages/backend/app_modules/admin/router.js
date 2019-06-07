import express from 'express';
import admin from './controller';

const app = express();

app.post('/signin', admin.authenticate);

export default app;
