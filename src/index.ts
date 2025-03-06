import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import weatherRoutes from './routes/weatherRoutes';
import moviesRoutes from './routes/moviesRoutes';
import { clearAllCache } from './middlewares/redis_cache';

// Clearing cache
clearAllCache();

// App initialisation
const port = 2012;
const app = express()
    // Settings
    .use(cors({origin: 'http://localhost:5173'}))
    .use(express.json())
    .use(helmet())
    .use(helmet.contentSecurityPolicy())
    .use(helmet.hidePoweredBy())
    .use(express.urlencoded({extended: true}))
    .use(morgan(":date \: :remote-addr - :method :url | :status | :response-time ms | :res[content-length]"))

    // Routes
    .use('/weather', weatherRoutes)
    .use('/movies', moviesRoutes)

    // Starting the server
    .listen(port, () => {console.log(`Server listening on port ${port}.`);})
;