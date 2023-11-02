const displayFavourite = document.getElementById('display-favourite');

const storageMovies = JSON.parse(localStorage.getItem('movie'));
console.log(storageMovies);

storageMovies.map((item) => {
  showMoviesOnPage(item);
});

function showMoviesOnPage(eachMovie) {
  const stringMovie = JSON.stringify(eachMovie);
  const eachMovieItem = document.createElement('li');
  eachMovieItem.classList.add('movie');
  eachMovieItem.innerHTML = `
        <img class="movie-img" src=${eachMovie.Poster} />
        <div class="movie-info">
            <div class="title-rating">
                <p class="movie-title">${eachMovie.Title}</p>
                <p class="movie-rating"><i class="fa fa-star fa-stack"></i>${eachMovie.imdbRating}
                </p>
            </div>
            <div class="time-genre-watchlist">
                <p class="runtime"> ${eachMovie.Runtime}</p>
                <p class="genre"> ${eachMovie.Genre}</p>
            </div>
            <div class="movie-plot">
                <p>${eachMovie.Plot}</p>
            </div>
        </div>
        `;

  displayFavourite.appendChild(eachMovieItem);
}
