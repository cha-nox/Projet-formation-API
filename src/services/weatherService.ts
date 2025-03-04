import WeatherResponse from '../types/WeatherResponse';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve(__dirname, '../../.env')});

export class WeatherService{
    private readonly api_key: string;
    private readonly api_url: string;

    constructor(){
        this.api_key = process.env.OPENWEATHER_API_KEY as string;
        this.api_url = 'https://api.openweathermap.org/data/2.5/weather' as string;
    };

    async getWeatherByCity(city: string): Promise<WeatherResponse>{
        try{
            const response = await axios.get(
                this.api_url,
                {
                    params: {
                        q: city,
                        appid: this.api_key,
                        units: 'metric'
                    }
                }
            );
            return response.data;
        }
        catch(error){
            if(axios.isAxiosError(error)){
                throw new Error(`Weather API error: ${error.response?.data.message || error.message}`);
            };
            throw error;
        };
    };
};