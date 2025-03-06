import { Router, RequestHandler } from 'express';
import { MovieService } from '../services/moviesService';
import { WeatherService } from '../services/weatherService';
import weatherGenreMap from '../types/WeatherGenreMap';
import MovieResponse from '../types/MovieResponse';
import { validateCity, cityValidationRules } from '../middlewares/city_name_validator';
import { cacheData, checkCachedRecommandation } from '../middlewares/redis_cache';

const moviesRoutes = Router();
const movieService = new MovieService();
const weatherService = new WeatherService();

// Getting movie data by movie name
const getMovieByName: RequestHandler = async (req, res) => {
    try{
        const name = req.query.name as string;
        if(!name){throw new Error("No movie name provided.");};
        const movieData = await movieService.getMovieByName(name);
        res.json(movieData);
    }
    catch(error){res.status(400).json({error: "Failed to get movie data."});};
};
moviesRoutes.get('/search', getMovieByName);

// Getting movies by genre
const getMoviesByGenre: RequestHandler = async (req, res) => {
    try{
        const genre = req.params.genreID as string;
        if(!genre){throw new Error("No genre provided.");};
        const movieData = await movieService.getMoviesByGenre(genre);
        res.json(movieData);
    }
    catch(error){res.status(400).json({error: "Failed to get movie data."});};
};
moviesRoutes.get('/genre/:genreID', getMoviesByGenre);

// Getting a movie recommendation depending on a passed city's weather
const getMoviesRecommendation: RequestHandler = async (req, res) => {
    try {
        // Checking if city name is provided
        const city_name = req.query.city_name as string;
        if(!city_name){throw new Error("No city_name provided.");}

        // Getting weather data
        const weather_data = await weatherService.getWeatherByCity(city_name);

        // Checking if weather data is valid
        if(!weather_data){throw new Error("Invalid weather data.");};

        // Getting weather type
        const weather_type = weather_data.weather[0].main;

        // Getting movie genres from depending on weather type
        const weather_genres: any = weatherGenreMap.find(map => map.weather_type === weather_type);
        
        // Getting movies recommendation by their genres
        let recommended_movies: MovieResponse[] = [];
        for(let i = 0; i < weather_genres.genres.length; i++){
            recommended_movies.push(await movieService.getMoviesByGenreID(weather_genres.genres[i]));
        };

        // Caching recommandation data
        cacheData('cachedRecommandation_' + city_name, recommended_movies);

        // Sending response
        res.json(recommended_movies);
    }
    catch(error){res.status(400).json({error: "Failed to get movie data."});};
};
moviesRoutes.get(
    '/recommendation',
    cityValidationRules,
    validateCity,
    checkCachedRecommandation,
    getMoviesRecommendation
);

// Getting movie data by movie ID
const getMovieByID: RequestHandler = async (req, res) => {
    try{
        const movieID = req.params.movieID as string;
        if(!movieID){throw new Error("No movie ID provided.");};
        const movieData = await movieService.getMovieByID(movieID);
        res.json(movieData);
    }
    catch(error){res.status(400).json({error: "Failed to get movie data."});};
};
moviesRoutes.get('/movie/:movieID', getMovieByID);

export default moviesRoutes; 