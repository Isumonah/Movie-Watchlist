const form = document.getElementById("search-form")
const searchInput = document.getElementById("search-input")
const  displayFavourite = document.getElementById("display-favourite")
displayFavourite.innerHTML = "anna"
const initialDisplay = document.getElementById("initial-display")



form.addEventListener("submit", (e) => {
    e.preventDefault()

    fetch(`https://www.omdbapi.com/?apikey=77d5c812&s=${searchInput.value}`)
        .then(res => res.json())
        .then(data => {
            
            for (movie of data.Search){
                fetch(`https://www.omdbapi.com/?apikey=77d5c812&i=${movie.imdbID}`)
                    .then (res => res.json())
                    .then (data => {
                        initialDisplay.style.display="none"
                        display.innerHTML += `
                            <div id="movie">
                                <img id="movie-img" src=${data.Poster} />
                                <div id="movie-info">
                                    <div id="title-rating">
                                        <p>${data.Title}
                                        <span id="movie-rating">${data.imdbRating}</span>
                                        </p>
                                    </div>
                                    <div id="time-genre-watchlist">
                                        <p id="runtime"> ${data.Runtime}</p>
                                        <p id="genre"> ${data.Genre}</p>
                                        <div id="movie-watchlist">
                                            <button id="add-button">
                                                <div id="wrapper">
                                                    <div id="horizontal"><div>
                                                    <div id="vertical"></div> 
                                                </div>
                                            </button>
                                            <p>Watchlist</p>
                                        </div>
                                    </div>
                                    <div id="movie-plot">
                                        <p> ${data.Plot}</p>
                                    </div>
                                </div>
                            </div>
                            `
                        document.getElementById("add-button").addEventListener("click", () => {
                            document.getElementById("vertical").classList.toggle("open")
                            document.getElementById("wrapper").classList.toggle("open")
                            const movie = document.getElementById("movie")
                            localStorage.setItem("movie", `${display.innerHTML}`);
                            const anna = localStorage.getItem("movie")
                            console.log(anna)
                        
                    })    


                    })
            }
 
        })

        


})
        

    



