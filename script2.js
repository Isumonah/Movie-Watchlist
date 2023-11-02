
const movieArea = document.getElementById('movie-area')
const watchListArea = document.getElementById('watchlist-area')
const search = document.getElementById('search')
const form = document.getElementById('form')

let movieIDs = []
let searchedMovies = []
let toWatchArray =[]
let localWatchList

if(form){
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
        getMovieId()
    })

}

// Getting movie from api
function getMovieId(){
    movieIDs = []
    const searchValue = search.value
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=31a5e553`)
        .then(res=>res.json())
        .then(data=>{
            for (let movie of data.Search){
                movieIDs.push(movie.imdbID)
            }
            form.reset()
            getMovie()
        })

}

function getMovie(){
    searchedMovies = []
    for (let movie of movieIDs){
        fetch(`https://www.omdbapi.com/?i=${movie}&apikey=31a5e553`)
            .then(res=>res.json())
            .then(data=>{
               
          
                if(searchedMovies.includes(data)){
                    ""
                }else{
                    searchedMovies.push({...data, watchList:false})
                    getMovieHtml()
                }
            })
    }
    
}

function render(){
    movieArea.innerHTML = getMovieHtml()
}

function getMovieHtml(){
    const Movies = searchedMovies.map(movie=>{
        return `
            <div class="movie">
                <!-- movies image -->
                <img src="${movie.Poster}" alt="The Poster for the movie">

                <!--Movie Details-->
                <div> 
                    <div class="movie-name-area"> <!--Movie name and rating flex-->
                        <h3> ${movie.Title}</h3>
                        <img src="images/star.png" alt="A star that indicates that the movie is top notch" srcset="">
                        <span>${movie.imdbRating}</span>
                    </div>

                    <p class="movie-time-detail">
                        <span>${movie.Runtime}</span> 
                        <span> ${movie.Genre}</span>
                        <button class='add-btn'>
                            <img src="images/add-icon.png" alt="An icon you can click to add movies" data-movie=${movie.imdbID}>
                        </button> 
                            <span class="watchlist-text" data-movie=${movie.imdbID}>${movie.watchList? 'Remove':'Watchlist'}</span>
                        </span>
                    </p>
                    <p>${movie.Plot}</p>
                </div>
            </div>
        `
    })
    movieArea.innerHTML = Movies
    return Movies
  
 }

document.addEventListener('click',(e)=>{
    if(e.target.dataset.movie){
        makeWatchlist(e.target.dataset.movie)
       
    }
})

function makeWatchlist(id){
    const makeToWatch = searchedMovies.filter(search=>{
        return search.imdbID === id  
    })[0]
    

    makeToWatch.watchList = !makeToWatch.watchList
    render()

    const toWatch = searchedMovies.filter(search=>{
        console.log("movie: ", search)
        return search.watchList
    })

    toWatchArray=toWatch
    localStorage.setItem('toWatchArray', JSON.stringify(toWatchArray))
}

function displayWatchList(){

    localWatchList = JSON.parse(localStorage.getItem('toWatchArray'))
    const myWatchList = localWatchList.map(movie=>{
        return `
            <div class="movie">
                <!-- movies image -->
                <img src="${movie.Poster}" alt="The Poster for the movie">
                <!--Movie Details-->
                <div> 
                    <div class="movie-name-area"> <!--Movie name and rating flex-->
                        <h3> ${movie.Title}</h3>
                        <img src="images/star.png" alt="A star that indicates that the movie is top notch" srcset="">
                        <span>${movie.imdbRating}</span>
                    </div>
                    <p class="movie-time-detail">
                        <span>${movie.Runtime}</span> 
                        <span> ${movie.Genre}</span>
                        <button class='remove-btn remove'>
                            <img src="images/remove-btn.png" alt="An icon you can click to remove movies">
                        </button> 
                        <span class="watchlist-text">Remove</span>
                    </p>
                    <p>${movie.Plot}</p>
                </div>
            </div>`
    })

    watchListArea.innerHTML= myWatchList

    if(watchListArea){
        const removeBtn = document.getElementsByClassName("remove") 
        const movie = document.getElementsByClassName("movie")
        for (let i = 0; i< removeBtn.length; i++){
            removeBtn[i].onclick = ()=>{
                movie[i].style.display = 'none'
                    localWatchList.splice(i,1)
            }
            
        }
    }

}


if(watchListArea){
    displayWatchList()
}
