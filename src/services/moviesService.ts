import MovieResponse from '../types/MoviesResponse';
import MovieGenresMap from '../types/MovieGenresMap';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve(__dirname, '../../.env')});

export class MovieService{
    private readonly api_key: string;
    private readonly api_url: string;

    constructor(){
        this.api_key = process.env.TMDB_API_KEY as string;
        this.api_url = 'https://api.themoviedb.org/3' as string;
    };

    async getMovieByName(name: string): Promise<MovieResponse>{
        try{
            const response = await axios.get(
                this.api_url + '/search/movie',
                {
                    params: {
                        query: name,
                        language: 'en-US',
                        api_key: this.api_key
                    }
                }
            );
            return response.data;
        }
        catch(error){
            if(axios.isAxiosError(error)){
                throw new Error(`Movie API error: ${error.response?.data.message || error.message}`);
            };
            throw error;
        };
    };

    async getMoviesByGenre(genre: string): Promise<MovieResponse>{
        try{
            // Getting genre ID by its name using MovieGenresMap enum
            const genreID = MovieGenresMap[genre.toUpperCase() as keyof typeof MovieGenresMap];
            if(!genreID){throw new Error(`Invalid genre : ${genre}.`);};

            // Getting movie list data
            const response = await axios.get(
                this.api_url + '/discover/movie',
                {
                    params: {
                        with_genres: genreID,
                        language: 'en-US',
                        api_key: this.api_key
                    }
                }
            );
            return response.data;
        }
        catch(error){
            if(axios.isAxiosError(error)){
                throw new Error(`Movie API error: ${error.response?.data.message || error.message}`);
            };
            throw error;
        };
    };

    async getMoviesByGenreID(genreID: string): Promise<MovieResponse>{
        try{
            if(!genreID){throw new Error(`Invalid genre ID : ${genreID}.`);};
            const response = await axios.get(
                this.api_url + '/discover/movie',
                {
                    params: {
                        with_genres: genreID,
                        language: 'en-US',
                        api_key: this.api_key
                    }
                }
            );
            return response.data;
        }
        catch(error){
            if(axios.isAxiosError(error)){
                throw new Error(`Movie API error: ${error.response?.data.message || error.message}`);
            };
            throw error;
        };
    };

    async getMovieByID(movieID: string): Promise<MovieResponse>{
        try{
            const response = await axios.get(
                this.api_url + `/movie/${movieID}`,
                {
                    params: {
                        language: 'en-US',
                        api_key: this.api_key
                    }
                }
            );
            return response.data;
        }
        catch(error){
            if(axios.isAxiosError(error)){
                throw new Error(`Movie API error: ${error.response?.data.message || error.message}`);
            };
            throw error;
        };
    };
};