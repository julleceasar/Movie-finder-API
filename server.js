import express from 'express'
import fetch from 'node-fetch'
import { router as watchlistRouter } from './routers/watchlistRouter.js'
import { movies } from './routers/watchlistRouter.js'


const app = express()
const port = 3000

app.use(express.json())
app.use("/watchlist", watchlistRouter)
app.use("/", express.static("client"))


const API_KEY = 'be305e02'

app.post('/movie/post', (req, res) => {

    let movieToAdd = req.body
    let movieExists = movies.find(movie => movie.imdbID === movieToAdd.imdbID)
    console.log(movieExists)
    if (!movieExists) {
        res.json(`${movieToAdd.Title} was added to watchlist`)
        movies.push(movieToAdd)

    } else {
        res.json(`${movieToAdd.Title} is already in watchlist!`)
    }

})

app.get('/movie/get/:title', async (req, res) => {
    const movieTitle = req.params.title
    let url = `http://www.omdbapi.com/?t=${movieTitle}&apikey=${API_KEY}`
    let method = "GET"
    let result = await makeRequest(url, method, undefined)
    res.send(result)
})


app.listen(port, () => {
    console.log(`app is running on port: ${port}`);
})


async function makeRequest(url, method, formData) {
    try {
        let response = await fetch(url, {
            method,
            body: formData
        })
        let result = await response.json()
        return result;

    } catch (err) {
        console.error(err);
    }
}