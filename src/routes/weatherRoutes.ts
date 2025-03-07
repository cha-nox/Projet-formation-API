import { Router, RequestHandler } from 'express';
import { WeatherService } from '../services/weatherService';
import { validateCity, cityValidationRules } from '../middlewares/city_name_validator';
import { cacheData, checkCachedWeatherData } from '../middlewares/redis_cache';
import { sendResponse } from '../middlewares/response_sender';

const weatherRoutes = Router();
const weatherService = new WeatherService();

// Get weather data by city name
const getWeather: RequestHandler = async (req, res, next) => {
    try{
        // Checking if city name is provided
        const city_name = req.query.city_name as string;
        if(!city_name){throw new Error("No city_name provided.");};

        // Getting weather data
        const weather_data = await weatherService.getWeatherByCity(city_name);
        
        // Saving weather data to res.locals, so the next middleware can cache it
        res.locals.data_name = 'cachedWeatherData_' + city_name;
        res.locals.data_content = weather_data;
        next();
    }
    catch(error){res.status(400).json({error: "Failed to get weather data."});};
};
weatherRoutes.get(
    '/',
    cityValidationRules,
    validateCity,
    checkCachedWeatherData,
    getWeather,
    cacheData,
    sendResponse
);

export default weatherRoutes;