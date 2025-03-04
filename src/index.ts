import express from 'express';
import weatherRoutes from './routes/weatherRoutes';
import moviesRoutes from './routes/moviesRoutes';

// Config
const app = express();
const port = 2012;
app.use(express.json());

// Weather routes
app.use('/weather', weatherRoutes);
app.use('/movies', moviesRoutes);

// Starting the server
app.listen(port, () => {console.log(`Server listening on port ${port}.`);});