import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis();

export const cacheData = async (data_name : string, data : any) => {
    if(!data_name || !data){throw new Error("No data provided.");};
    try{
        await redis.set(data_name, JSON.stringify(data), 'EX', 3600 / 2); //Caches for an half hour.
    }
    catch(error){
        console.log(error);
        throw new Error("Failed to cache data.");
    };
};

export const checkCachedCity = async (req: Request, res: Response, next: NextFunction) => {
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

export const checkCachedRecommandation = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const cached_weather_data = await redis.get('cachedRecommandation_' + req.query.city_name);

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