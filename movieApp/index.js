const inputMovieFilm = document.querySelector('#input')
const enterSiteText = document.querySelector('#first-entry')
const movieList = document.querySelector('#movie-list')
const arrowLeft = document.querySelector('#arrow-left__btn')
const arrowRight = document.querySelector('#arrow-right__btn')
const themeButton = document.querySelector('#theme')

let apiKey = '3ef4ab9e'
let apiUrl = 'https://www.omdbapi.com/'
let page = 1

inputMovieFilm.addEventListener('keyup', function () {
    arrowRight.style.display = 'none'
    arrowLeft.style.display = 'none'
    movieName = inputMovieFilm.value
    if (inputMovieFilm.value === '') {
        enterSiteText.style.display = 'flex'
        themeButton.removeAttribute('disabled')
        hideResult()
    } else {
        enterSiteText.style.display = 'none'
        themeButton.setAttribute('disabled', '')
        movieList.innerHTML = ''
        page = 1
        getMovies(movieName, page)
    }
})

movieList.addEventListener('click', function (event) {
    showSingleMovieInfo(event.target.closest('.movie').getAttribute("show-id"))
})

arrowRight.addEventListener('click', function () {
    page += 1
    movieList.innerHTML = ''
    getMovies(movieName, page)
    showAndChangeResult(movieName, page)
})

arrowLeft.addEventListener('click', function () {
    page -= 1
    movieList.innerHTML = ''
    showAndChangeResult(movieName, page)
    getMovies(movieName, page)
    if (page == 1) {
        arrowLeft.style.display = 'none'
    }
})

const movieInfoWrapper = document.querySelector('#movie-info')

function showSingleMovieInfo(id) {
    fetch(`${apiUrl}?i=${id}&apikey=${apiKey}`).then((response) => {
        response.json().then((res) => {
            if (res.Poster == 'N/A') {
                res.Poster = '../Images/movieApp/poster-not-found.png'
            }
            if (res.Ratings.length == 0) {
                res.Ratings[0] = {
                    Value: 'Not found'
                }
            }
            movieInfoWrapper.style.display = 'flex'
            movieInfoWrapper.classList.add('movie-info-bgc')
            movieInfoWrapper.innerHTML = `
        <div class="cancel-poster">
        <button id="cancel">
        <img class="cancel__img" src="../Images/movieApp/Icons/cancel.svg"/>
        </button>
        <img class="poster_ _img" src="${res.Poster}"/>
        </div>
        <div class="movie-info__text">
        <div class="movie-title">${res.Title}</div>
        <div class="movie-rating">${res.Ratings[0].Value || 'Not found'}</div>
        <div class="movie-info__text"><span class="span--color-light">Reliazed:</span>${res.Released}<span class="span--color-light">Runtime:</span>${res.Runtime}</div>
        <div class="movie-info__text"><span class="span--color-light">Genre:</span>${res.Genre}</div>
        <div class="movie-info__text"><span class="span--color-light">Director:</span>${res.Director}<span class="span--color-light">Writer:</span>${res.Writer}</div>
        <div class="movie-info__text"><span class="span--color-light">Summary:</span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</div>
        </div>
        `
            if (localStorage.getItem('darkTheme') == 'true') {
                movieInfoWrapper.classList.add('dark-theme--bgc')
                movieInfoWrapper.innerHTML = `
        <div class="cancel-poster">
        <button id="cancel" class='dark-theme--bgc'>
        <img class="cancel__img" src="../Images/movieApp/Icons/cancel.svg"/>
        </button>
        <img class="poster_ _img" src="${res.Poster}"/>
        </div>
        <div class="movie-info__text">
        <div class="movie-title--dark-theme">${res.Title}</div>
        <div class="movie-rating">${res.Ratings[0].Value || 'Not found'}</div>
        <div class="movie-info__text--dark-theme"><span class="span--color-light">Reliazed:</span>${res.Released}<span class="span--color-light">Runtime:</span>${res.Runtime}</div>
        <div class="movie-info__text--dark-theme"><span class="span--color-light">Genre:</span>${res.Genre}</div>
        <div class="movie-info__text--dark-theme"><span class="span--color-light">Director:</span>${res.Director}<span class="span--color-light">Writer:</span>${res.Writer}</div>
        <div class="movie-info__text--dark-theme"><span class="span--color-light">Summary:</span>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</div>
        </div>
        `
            }
            const cancelButton = document.querySelector('#cancel')
            cancelButton.addEventListener('click', function () {
                movieInfoWrapper.innerHTML = ''
                movieInfoWrapper.style.display = 'none'
            })
        })
    })
}

function getMovies(movieName, page) {
    showAndChangeResult(movieName, page)
    fetch(`${apiUrl}?apiKey=${apiKey}&s=${movieName}&page=${page}`).then((res) => {
        res.json().then((res) => {
            let movies = res.Search
            if (res.totalResults > 9) {
                arrowRight.style.display = 'flex'
            } else {
                arrowRight.style.display = 'none'
            }
            if (movies != undefined) {
                showMovies(movies)
            }
            if (page > 1) {
                arrowLeft.style.display = 'flex'
            } else {
                arrowLeft.style.display = 'none'
            }

        })
    })
}

function showMovies(movies) {
    movies.forEach((item) => {
        movieList.style.display = 'flex'
        const elem = document.createElement('button');
        elem.classList.add('movie');
        elem.setAttribute("show-id", item.imdbID);
        elem.innerHTML = `
        <img id="movie-img" src="${item.Poster}" />
        <div id="movie-title" class="movie-title--color">${item.Title}</div>
        `
        movieList.appendChild(elem)
        if (localStorage.getItem('darkTheme') == 'true') {
            elem.classList.add('dark-theme--bgc')
            elem.innerHTML = `
            <img id="movie-img" src="${item.Poster}" />
            <div id="movie-title" class="dark-theme--color">${item.Title}</div>
        `
        }
    })
}

const resultWrapper = document.querySelector('#result-wrapper')
function showAndChangeResult(movieName, page) {
    resultWrapper.style.display = 'flex'
    resultWrapper.innerHTML = `
    <div class="result__text---color">Result for <span class="span--color-light">${movieName}</span> | Page: <span class="span--color-light">${page}</span></div>
    `
    if (localStorage.getItem('darkTheme') == 'true') {
        resultWrapper.innerHTML = `
    <div class="result__text---dark-theme">Result for <span class="span--color-light">${movieName}</span> | Page: <span class="span--color-light">${page}</span></div>
    `
    }
}

function hideResult() {
    resultWrapper.style.display = 'none'
    movieList.style.display = 'none'
}

//DARK THEME

if (localStorage.getItem('darkTheme') == 'false') {
    enableDarkTheme()
} else if (localStorage.getItem('darkTheme') == 'true') {
    enableDarkTheme()
} else if (localStorage.getItem('darkTheme') == null) {
    enableDarkTheme()
}

themeButton.addEventListener('click', function () {
    if (localStorage.getItem('darkTheme') == 'false') {
        localStorage.setItem('darkTheme', true)
        enableDarkTheme()
    } else if (localStorage.getItem('darkTheme') == 'true') {
        localStorage.setItem('darkTheme', false)
        enableDarkTheme()
    } else if (localStorage.getItem('darkTheme') == null) {
        localStorage.setItem('darkTheme', true)
        enableDarkTheme()
    }
})

function enableDarkTheme() {
    const body = document.querySelector('#body')
    const logo = document.querySelector('.logo')
    const input = document.querySelector('#input')
    let movieColor = movieList.children

    if (localStorage.getItem('darkTheme') == 'true') {
        body.classList.add('dark-theme--bgc')
        themeButton.classList.add('dark-theme--bgc')
        logo.innerHTML = `
            <img class="logo-img--dark" src="../Images/movieApp/Icons/logo-dark.svg" />
            <div class="logo-text dark-theme--color">Movie app</div>
        `
        input.classList.add('input-color--dark')
        arrowRight.classList.add('dark-theme--bgc')
        arrowLeft.classList.add('dark-theme--bgc')

    }
    if (localStorage.getItem('darkTheme') == 'false') {
        body.classList.remove('dark-theme--bgc')
        themeButton.classList.remove('dark-theme--bgc')
        logo.innerHTML = `
            <img class="logo-img--light" src="../Images/movieApp/Icons/logo-light.svg" />
            <div class="logo-text">Movie app</div>
        `
        input.classList.remove('input-color--dark')
        arrowRight.classList.remove('dark-theme--bgc')
        arrowLeft.classList.remove('dark-theme--bgc')

    }

}
