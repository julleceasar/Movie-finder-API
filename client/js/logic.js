
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const movieContainer = document.getElementById('movieInfo')
const welcomeDiv = document.getElementById('welcomeText')
let moviesInWatchlist;

searchBtn.addEventListener('click', getSearchedMovie)
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getSearchedMovie()
    }
})

window.addEventListener('load', async () => {
    moviesInWatchlist = await getMoviesFromWatchList()
})


async function getSearchedMovie() {
    let url = `http://localhost:3000/movie/get/${searchInput.value}`
    let method = "GET"
    let result = await makeRequest(url, method, undefined)
    if (result.Error) {
        let errorMsg = document.createElement('h1')
        movieContainer.innerHTML = ''
        welcomeDiv.innerHTML = ''
        errorMsg.innerText = `No results found for: ${searchInput.value}`
        movieContainer.append(errorMsg)
    } else {
        renderSearchedMovie(result)
    }
}

async function renderSearchedMovie(movie) {

    movieContainer.innerHTML = ''
    const title = document.createElement('h1')
    const actors = document.createElement('h4')
    const year = document.createElement('h5')
    const imdbRating = document.createElement('h5')
    const runTime = document.createElement('h5')
    const posterImg = document.createElement('img')
    const addMovieBtn = document.createElement('button')
    const movieInfoDiv = document.createElement('div')
    const director = document.createElement('h4')
    const writers = document.createElement('h4')
    const plot = document.createElement('p')
    const starIcon = document.createElement('i')
    const genre = document.createElement('h4')
    const awards = document.createElement('h4')
    const message = document.createElement('p')

    starIcon.classList.add('bi')
    starIcon.classList.add('bi-star-fill')
    movieInfoDiv.classList.add('movieInfoDiv')
    addMovieBtn.classList.add('btn')
    addMovieBtn.classList.add('btn-warning')
    const timeYearDiv = document.createElement('div')
    timeYearDiv.classList.add('timeYear')
    const imgDiv = document.createElement('div')
    imgDiv.classList.add('imgDiv')

    message.innerText = ''
    awards.innerText = `Awards: ${movie.Awards}`
    plot.innerText = movie.Plot
    genre.innerText = `Genre: ${movie.Genre}`
    writers.innerText = `Writers: ${movie.Writer}`
    director.innerText = `Director: ${movie.Director}`
    year.innerText = `${movie.Released.substring(7)} ·`
    runTime.innerText = `${movie.Runtime} · `
    imdbRating.innerText = `IMDb: ${movie.imdbRating} / 10`
    posterImg.src = movie.Poster
    title.innerText = movie.Title
    actors.innerText = `Actors: ${movie.Actors}`

    movieInfoDiv.append(plot, actors, director, writers, genre, awards)
    timeYearDiv.append(year, runTime, starIcon, imdbRating)
    imgDiv.append(posterImg, movieInfoDiv)
    movieContainer.append(title, timeYearDiv, imgDiv, addMovieBtn, message)


    let movieExists = moviesInWatchlist.find(movieInWatchlist => movieInWatchlist.imdbID === movie.imdbID)

    if (movieExists) {
        addMovieBtn.innerText = '✓ In Watchlist'
    } else {
        addMovieBtn.innerText = '+ Add to Watchlist'
    }

    if (moviesInWatchlist.length == 0) {
        addMovieBtn.innerText = '+ Add to Watchlist'
    }

    addMovieBtn.addEventListener('click', () => {
        saveMovie(movie, message, addMovieBtn)
    })

}

async function saveMovie(movie, message, addMovieBtn) {
    let url = `http://localhost:3000/movie/post`
    let method = "POST"
    let body = JSON.stringify(movie)
    let result = await makeRequest(url, method, body)
    if (result === `${movie.Title} is already in watchlist!`) {
        message.innerText = `${result} ❌`
    } else {
        addMovieBtn.innerText = '✓ In Watchlist'
        message.innerText = `${result} ✅`
    }
    console.log(result)
}

async function getMoviesFromWatchList() {
    let url = `http://localhost:3000/watchlist/getAll`
    let method = "GET"
    let result = await makeRequest(url, method, undefined)
    return result
}


async function makeRequest(url, method, body) {
    try {
        let response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body
        })
        let result = await response.json()
        return result;

    } catch (err) {
        console.error(err);
    }
}