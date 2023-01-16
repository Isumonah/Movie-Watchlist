const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const display = document.getElementById("display");
const initialDisplay = document.getElementById("initial-display");

const displayFavourite = document.getElementById("display-favourite");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  


  fetch(`https://www.omdbapi.com/?apikey=77d5c812&s=${searchInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      for (movie of data.Search) {
        fetch(`https://www.omdbapi.com/?apikey=77d5c812&i=${movie.imdbID}`)
          .then((res) => res.json())
          .then((data) => {
            initialDisplay.style.display = "none";
            
            // const horizontal = document.createElement("div")
            
            // const myButton = document.createElement("button")
            display.innerHTML += `
                            <div id="movie"
                                class="movie">
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
                                                <div id="wrapper" class="our-button">
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
                            `;
           
                            
                localStorage.setItem("movie", JSON.stringify(data));
              
                // let movies = (localStorage.getItem("movie"))
            
                // addListenersToAddMovieButtons()
  
          });
      }
    });
});

// function getMovies () {
    
//     let movieBtns = document.getElementsByClassName("our-button")
//     for (movieBtn of movieBtns){
//         movieBtn.addEventListener("click", addEventListenerToBtn)

//     }
// // let movies = document.getElementsByClassName("movie")
// // console.log(movies)

// // console.log(movies.length)
// }

function getMovies(e){
    const btnEvent = e.target
    console.log("anna")
}


    const buttonCollection = document.getElementsByClassName("our-button")
    console.log(buttonCollection)
    for(button of buttonCollection){
        myEvent = button.event.target
        console.log(myEvent)
        const btn = button.addEventListener("click", getMovies)
    }




//     let movieBtns = document.getElementsByClassName("our-button")
//     console.log(movieBtns)

//     for (movieBtn of movieBtns){
//     // movieBtn.addEventListener("click", getMovies)
//     console.log(movieBtn)
    
// }






// function addListenersToAddMovieButtons() {
//     const buttonCollection = document.querySelectorAll("#add-button")
//     const lastButton = buttonCollection[buttonCollection.length - 1]
//     lastButton.addEventListener("click", addMovie)
//     console.log(buttonCollection)
// }

// function addMovie (eventObject, displayMovie){
//   eventObject.preventDefault()
//   const addBtn = eventObject.target
//   displayMovie.innerHTML = "this is from JS"
  
// }

