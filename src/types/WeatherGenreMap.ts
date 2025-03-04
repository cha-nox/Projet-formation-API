import MovieGenresMap from "./MovieGenresMap";

class WeatherGenreMap{
    weather_type:   string;
    genres:         number[];
    mood:           string;
    description:    string;

    constructor(
        weather_type:   string,
        genres:         number[],
        mood:           string,
        description:    string
    ){
        this.weather_type   = weather_type;
        this.genres         = genres;
        this.mood           = mood;
        this.description    = description;
    };
};

const weatherGenreMap : WeatherGenreMap[] = [
    {
        weather_type: 'clear sky',
        genres: [MovieGenresMap.ADVENTURE, MovieGenresMap.ACTION, MovieGenresMap.FAMILY],
        mood: 'énergique',
        description: "Par beau temps, on se sent aventureux !"
    },
    {
        weather_type: 'rain',
        genres: [MovieGenresMap.DRAMA, MovieGenresMap.ROMANCE],
        mood: 'mélancolique',
        description: "Temps idéal pour un film émouvant."
    },
    {
        weather_type: 'moderate rain',
        genres: [MovieGenresMap.ROMANCE, MovieGenresMap.FAMILY, MovieGenresMap.DOCUMENTARY],
        mood: 'apaisé',
        description: "Une légère pluie qui laisse place à une atmosphère paisible."
    },
    {
        weather_type: 'snow',
        genres: [MovieGenresMap.FANTASY, MovieGenresMap.ANIMATION],
        mood: 'féérique',
        description: "La neige nous transporte dans un monde magique."
    },
    {
        weather_type: 'thunderstorm',
        genres: [MovieGenresMap.HORROR, MovieGenresMap.THRILLER],
        mood: 'intense',
        description: "L'orage appelle au suspense."
    },
    {
        weather_type: 'clouds',
        genres: [MovieGenresMap.DRAMA, MovieGenresMap.FANTASY, MovieGenresMap.MYSTERY],
        mood: 'rêveur',
        description: "Les nuages nous invitent à l'évasion."
    }
];

export default weatherGenreMap;