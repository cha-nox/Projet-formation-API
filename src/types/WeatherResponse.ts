// interface Coord{
//     lon: number
//     lat: number
// }

// interface Weather{
//     id: number
//     main: string
//     description: string
//     icon: string
// }

// interface Main{
//     temp: number
//     feels_like: number
//     temp_min: number
//     temp_max: number
//     pressure: number
//     humidity: number
//     sea_level: number
//     grnd_level: number
// }

// interface Wind{
//     speed: number
//     deg: number
// }

// interface Clouds{
//     all: number
// }

// interface Sys{
//     type: number
//     id: number
//     country: string
//     sunrise: number
//     sunset: number
// }

// export default interface WeatherResponse{
//     coord: Coord
//     weather: Weather[]
//     base: string
//     main: Main
//     visibility: number
//     wind: Wind
//     clouds: Clouds
//     dt: number
//     sys: Sys
//     timezone: number
//     id: number
//     name: string
//     cod: number
// }

export default interface WeatherResponse{
    coord: {
        lon: number;
        lat: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
    };
    clouds: {all: number;};
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
};