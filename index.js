import express from 'express';
import cors from 'cors';

import config from './config.js';
import citaRoute from './routes/citaRoute.js';
import clienteRoute from './routes/clienteRoute.js';
import inventarioRoute from './routes/inventarioRoute.js';
import petRoute from './routes/petRoute.js';
import serviceRoute from './routes/serviceRoute.js';
import userRoute from './routes/userRoute.js';
import veterinarianRoute from './routes/veterinarianRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/api/citas', citaRoute);
app.use('/api/clientes', clienteRoute);
app.use('/api/inventario', inventarioRoute);
app.use('/api/pets', petRoute);
app.use('/api/servicios', serviceRoute);
app.use('/api/users', userRoute);
app.use('/api/veterinarios', veterinarianRoute);

app.listen(config.port, () =>
  console.log(`Server is live @ ${config.hostUrl}`),
);