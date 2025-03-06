import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import weatherRoutes from './routes/weatherRoutes';
import moviesRoutes from './routes/moviesRoutes';

// Config
const port = 2012;
const app = express()
    // Settings
    .use(cors({origin: 'http://localhost:5173'}))
    .use(express.json())
    .use(helmet())
    .use(helmet.contentSecurityPolicy())
    .use(helmet.hidePoweredBy())
    .use(express.urlencoded({ extended: true }))

    // Requests logging by PM2
    .use((req, res, next) => {
        console.log(`${new Date().toISOString()} : ${req.method} ${req.url}`)
        next()
    })

    // Routes
    .use('/weather', weatherRoutes)
    .use('/movies', moviesRoutes)

    // Starting the server
    .listen(port, () => {console.log(`Server listening on port ${port}.`);})
;