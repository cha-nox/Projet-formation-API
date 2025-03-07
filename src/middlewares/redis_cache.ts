import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis();

export const cacheData = async (req: Request, res: Response, next: NextFunction) => {
    if(!res.locals.data_name || !res.locals.data_content){throw new Error("No data provided.");};
    try{
        await redis.set(
            res.locals.data_name,
            JSON.stringify(res.locals.data_content),
            'EX', 3600 / 2 //Data cache expires in half an hour.
        );
        next();
    }
    catch(error){
        console.log(error);
        throw new Error("Failed to cache data.");
    };
};

export const checkCachedWeatherData = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const cached_weather_data = await redis.get('cachedWeatherData_' + req.query.city_name);

        if(cached_weather_data){res.json(JSON.parse(cached_weather_data));}
        else{next();};
    }
    catch(error){
        console.log(error);
        throw new Error("Failed to get cached weather data.");
    };
};

export const checkCachedRecommendation = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const cached_weather_data = await redis.get('cachedRecommendation_' + req.query.city_name);

        if(cached_weather_data){res.json(JSON.parse(cached_weather_data));}
        else{next();};
    }
    catch(error){
        console.log(error);
        throw new Error("Failed to get cached weather data.");
    };
};

export const clearAllCache = async () => {
    try{
        await redis.flushall();
    }
    catch(error){
        console.log(error);
        throw new Error("Failed to clear cache.");
    };
};