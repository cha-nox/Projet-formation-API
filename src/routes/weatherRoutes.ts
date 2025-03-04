import { Router, RequestHandler } from 'express';
import { WeatherService } from '../services/weatherService';
import { validateCity, cityValidationRules } from '../middlewares/city_name_validator';

const weatherRoutes = Router();
const weatherService = new WeatherService();

// Get weather data by city name
const getWeather: RequestHandler = async (req, res) => {
    try{
        // Checking if city name is provided
        const city_name = req.query.city_name as string;
        if(!city_name){throw new Error("No city_name provided.");};

        // Getting weather data
        const weather_data = await weatherService.getWeatherByCity(city_name);
        res.json(weather_data);
    }
    catch(error){res.status(400).json({error: "Failed to get weather data."});};
};
weatherRoutes.get('/', cityValidationRules, validateCity, getWeather);

export default weatherRoutes; 