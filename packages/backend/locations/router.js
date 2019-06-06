import express from 'express'
import location from './controller'

const app = express();

app.get('/', location.getAllLocations);
app.post('/', location.createLocation);
app.get('/:id/', location.getLocation);
app.put('/:id/', location.updateLocation);
app.delete('/:id/', location.deleteLocation);

export default app;
