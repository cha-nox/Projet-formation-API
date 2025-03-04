import { Router, RequestHandler } from 'express';
import { WeatherService } from '../services/weatherService';

const weatherRoutes = Router();
const weatherService = new WeatherService();

// Get weather data by city name
const getWeather: RequestHandler = async (req, res) => {
    try{
        const city = req.query.city as string;
        if(!city){throw new Error("No city provided.");};
        const weatherData = await weatherService.getWeatherByCity(city);
        res.json(weatherData);
    }
    catch(error){res.status(400).json({error: "Failed to get weather data."});};
};
weatherRoutes.get('/', getWeather);

export default weatherRoutes; 