import express from 'express'

export const router = express.Router()

export let movies = [
    {
        Title: "Interstellar",
        Year: "2014",
        Rated: "PG-13",
        Released: "07 Nov 2014",
        Runtime: "169 min",
        Genre: "Adventure, Drama, Sci-Fi",
        Director: "Christopher Nolan",
        Writer: "Jonathan Nolan, Christopher Nolan",
        Actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        Language: "English",
        Country: "United States, United Kingdom, Canada",
        Awards: "Won 1 Oscar. 44 wins & 148 nominations total",
        Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        Ratings: [
            {
                Source: "Internet Movie Database",
                Value: "8.6/10"
            },
            {
                Source: "Rotten Tomatoes",
                Value: "73%"
            },
            {
                Source: "Metacritic",
                Value: "74/100"
            }
        ],
        Metascore: "74",
        imdbRating: "8.6",
        imdbVotes: "1,774,128",
        imdbID: "tt0816692",
        Type: "movie",
        DVD: "31 Mar 2015",
        BoxOffice: "$188,020,017",
        Production: "N/A",
        Website: "N/A",
        Response: "True"
    },
    {
        Title: "Game of Thrones",
        Year: "2011–2019",
        Rated: "TV-MA",
        Released: "17 Apr 2011",
        Runtime: "57 min",
        Genre: "Action, Adventure, Drama",
        Director: "N/A",
        Writer: "David Benioff, D.B. Weiss",
        Actors: "Emilia Clarke, Peter Dinklage, Kit Harington",
        Plot: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
        Language: "English",
        Country: "United States, United Kingdom",
        Awards: "Won 59 Primetime Emmys. 387 wins & 632 nominations total",
        Poster: "https://m.media-amazon.com/images/M/MV5BYTRiNDQwYzAtMzVlZS00NTI5LWJjYjUtMzkwNTUzMWMxZTllXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_SX300.jpg",
        Ratings: [
            {
                Source: "Internet Movie Database",
                Value: "9.2/10"
            }
        ],
        Metascore: "N/A",
        imdbRating: "9.2",
        imdbVotes: "2,025,740",
        imdbID: "tt0944947",
        Type: "series",
        totalSeasons: "8",
        Response: "True"
    }
]

router.get('/getAll', (req, res) => {
    res.send(movies)
})

router.delete('/delete/:id', (req, res) => {
    const indexToRemove = movies.findIndex(movie => movie.imdbID === req.params.id)
    movies.splice(indexToRemove, 1)
    res.send(movies)
})

router.put('/put', (req, res) => {
    const foundIndex = movies.findIndex(movie => movie.imdbID === req.body.imdbID)
    movies[foundIndex] = req.body
    res.send(movies)
})
