import { showModal } from './modal.js'
import { modalWrap } from './modal.js'

const movieContainer = document.getElementById('movieInfo')


async function initSite() {
    getMoviesFromWatchList()
}


async function getMoviesFromWatchList() {
    let url = `http://localhost:3000/watchlist/getAll`
    let method = "GET"
    let result = await makeRequest(url, method, undefined)
    console.log(result)
    renderMoviesFromWatchList(result)
}

function renderMoviesFromWatchList(movies) {
    const columnHeader = document.createElement('div')
    const headerText = document.createElement('h1')
    headerText.innerText = 'Your Watchlist'
    columnHeader.classList.add('headerColumn')
    headerText.classList.add('headerText')

    columnHeader.append(headerText)
    movieContainer.append(columnHeader)

    if (movies.length == 0) {
        const msg = document.createElement('h3')
        msg.innerHTML = `Watchlist is empty, start searching for your favourite movies <a href="index.html">here</a>`
        movieContainer.append(msg)
    } else {

        movies.forEach(movie => {
            const deleteBtn = document.createElement('button')
            const updateBtn = document.createElement('button')
            const btnDiv = document.createElement('btnDiv')
            const posterImg = document.createElement('img')
            const column = document.createElement('div')
            const title = document.createElement('h2')
            const actors = document.createElement('p')
            const year = document.createElement('p')
            const imdbRating = document.createElement('p')
            const runTime = document.createElement('p')
            const plot = document.createElement('p')
            const movieInfoDiv = document.createElement('div')
            const yearTimeDiv = document.createElement('div')
            const ratingDiv = document.createElement('div')
            const actorsDiv = document.createElement('div')
            const genre = document.createElement('p')

            btnDiv.classList.add('btnDiv')
            updateBtn.classList.add('btn')
            updateBtn.classList.add('btn-warning')
            movieInfoDiv.classList.add('movieInfoDiv')
            deleteBtn.classList.add('btn')
            deleteBtn.classList.add('btn-danger')
            posterImg.classList.add('watchlistImg')
            column.classList.add('col-12')

            plot.innerText = movie.Plot
            genre.innerText = `${movie.Genre}`
            actors.innerText = `${movie.Writer}`
            year.innerText = `${movie.Released.substring(7)} |`
            runTime.innerText = `${movie.Runtime} |`
            imdbRating.innerText = `IMDb: ${movie.imdbRating} / 10`
            deleteBtn.innerText = 'Delete'
            updateBtn.innerText = 'Edit'
            posterImg.src = movie.Poster
            title.innerText = movie.Title

            btnDiv.append(deleteBtn, updateBtn)
            yearTimeDiv.append(year, runTime, genre)
            ratingDiv.append(imdbRating)
            actorsDiv.append(actors)
            movieInfoDiv.append(title, yearTimeDiv, ratingDiv, actorsDiv, plot)
            column.append(posterImg, movieInfoDiv)
            movieContainer.append(column, btnDiv)

            deleteBtn.addEventListener('click', () => {
                deleteMovie(movie)
            })

            updateBtn.addEventListener('click', () => {
                showModal()
                modalWrap.querySelector('#saveBtn').addEventListener('click', () => {
                    movie.Title = modalWrap.querySelector('#titleInput').value || movie.Title
                    movie.imdbRating = modalWrap.querySelector('#ratingInput').value || movie.imdbRating
                    movie.Genre = modalWrap.querySelector('#genreInput').value || movie.Genre
                    updateMovie(movie)

                })
            })

        });
    }


}

async function updateMovie(movieToUpdate) {
    let url = `http://localhost:3000/watchlist/put`
    let method = "PUT"
    let body = JSON.stringify(movieToUpdate)
    let result = await makeRequest(url, method, body)
    console.log(result)
    location.reload()
}



async function deleteMovie(movieToDelete) {
    let url = `http://localhost:3000/watchlist/delete/${movieToDelete.imdbID}`
    let method = "DELETE"
    let result = await makeRequest(url, method, undefined)
    location.reload()
    console.log(result)
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


window.addEventListener('load', initSite)