const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
let display = document.getElementById('display');
const initialDisplay = document.getElementById('initial-display');
const homePage = document.getElementById('home');

let movieArray = [];
const addedMovies = [];

document.addEventListener('DOMContentLoaded', () => {
  const goToFavoritePageLink = document.querySelector('.favouriteLink');

  goToFavoritePageLink.addEventListener('click', () => {
    sessionStorage.setItem(
      'movieSearchPage',
      JSON.stringify(document.body.innerHTML)
    );
  });
});

const storedMovies = JSON.parse(sessionStorage.getItem('movieSearchPage'));
if (storedMovies) {
  document.body.innerHTML = storedMovies;
  console.log(storedMovies);
  console.log(movieArray);

  sessionStorage.removeItem('movieSearchPage');

  const oldPlusBtn = document.querySelectorAll('.plus-icon');
  const oldMinusBtn = document.querySelectorAll('.minus-icon');
  movieArray = JSON.parse(localStorage.getItem('movie'));

  oldPlusBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      const datasetID = e.currentTarget.dataset.id;

      movieArray = JSON.parse(localStorage.getItem('movie'));

      item.classList.add('hidden-icon');
      item.classList.remove('show-icon');

      const minusBtn = e.target.nextElementSibling;

      console.log(minusBtn);

      minusBtn.classList.remove('hidden-icon');
      minusBtn.classList.add('show-icon');

      minusBtn.addEventListener('click', (e) => removeMovie(e));

      const newMovies = JSON.parse(sessionStorage.getItem('addedMovies'));

      newMovies.map((item) => {
        if (item.imdbID === datasetID && !movieArray.includes(datasetID)) {
          movieArray.push(item);
          localStorage.setItem('movie', JSON.stringify(movieArray));
          addToLocalStorage();
        }
      });
    });
  });

  oldMinusBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      console.log(movieArray);
      e.stopPropagation();
      const datasetID = e.target.dataset.id;
      const plusBtn = e.target.previousElementSibling;
      plusBtn.classList.remove('hidden-icon');
      plusBtn.classList.add('show-icon');
      e.target.classList.remove('show-icon');
      e.target.classList.add('hidden-icon');

      e.target.removeEventListener('click', removeMovie);

      movieArray = movieArray.filter((item) => {
        return item.imdbID !== datasetID;
      });
      localStorage.setItem('movie', JSON.stringify(movieArray));

      console.log(movieArray);
    });
  });
}
// oldPlusBtn.addEventListener('click', (e) => {
//   const datasetID = e.currentTarget.dataset.id;

//   addedMovies.map((item) => {
//     if ((item.imdbID === datasetID) & !movieArray.includes(item)) {
//       movieArray.push(item);
//       localStorage.setItem('movie', JSON.stringify(movieArray));
//       addToLocalStorage();
//     }
//   });
// });

// oldMinusBtn.addEventListener('click', removeMovie);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(`https://www.omdbapi.com/?apikey=77d5c812&s=${searchInput.value}`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 404) {
        throw new Error('Item not found');
      } else {
        throw new Error('API request failed');
      }
    })
    .then((data) => {
      if (data.Search) {
        for (movie of data.Search) {
          fetch(`https://www.omdbapi.com/?apikey=77d5c812&i=${movie.imdbID}`)
            .then((res) => res.json())
            .then((data) => {
              showMoviesOnSearchPage(data, display);
              addBtn(data);
            });
        }
      } else {
        initialDisplay.innerHTML = 'No results found';
        initialDisplay.style.fontWeight = 'bold';
        initialDisplay.style.color = 'black';
      }
    })
    .catch((error) => {
      console.error(error.message);
      if (error.message === 'Item not found') {
        initialDisplay.innerHTML = 'Item not found';
      }
    });
});

function addBtn(data) {
  addedMovies.push(data);
  sessionStorage.setItem('addedMovies', JSON.stringify(addedMovies));

  const button = document.querySelectorAll('.add-button');

  button.forEach((item) => {
    const plusIcon = item.querySelector('.plus-icon');
    const minusIcon = item.querySelector('.minus-icon');
    plusIcon.addEventListener('click', (e) => {
      plusIcon.classList.add('hidden-icon');
      plusIcon.classList.remove('show-icon');
      minusIcon.classList.remove('hidden-icon');
      minusIcon.classList.add('show-icon');
      minusIcon.addEventListener('click', (e) => removeMovie(e));

      const datasetID = e.currentTarget.dataset.id;

      addedMovies.map((item) => {
        if (item.imdbID === datasetID && !movieArray.includes(item)) {
          movieArray.push(item);
          localStorage.setItem('movie', JSON.stringify(movieArray));
          addToLocalStorage();
        } else {
          return movieArray;
        }
      });
    });
  });
}

function removeMovie(e) {
  e.stopPropagation();
  const datasetID = e.target.dataset.id;
  const plusBtn = e.target.previousElementSibling;
  plusBtn.classList.remove('hidden-icon');
  plusBtn.classList.add('show-icon');
  e.target.classList.remove('show-icon');
  e.target.classList.add('hidden-icon');

  e.target.removeEventListener('click', removeMovie);

  movieArray = movieArray.filter((item) => {
    return item.imdbID !== datasetID;
  });
  localStorage.setItem('movie', JSON.stringify(movieArray));
}

function addToLocalStorage() {
  const storageMovies = JSON.parse(localStorage.getItem('movie'));
}

function showMoviesOnSearchPage(eachMovie, display) {
  initialDisplay.style.display = 'none';
  showMoviesOnPage(eachMovie, display);
}

function showMoviesOnPage(eachMovie, item) {
  const stringMovie = JSON.stringify(eachMovie);
  const eachMovieItem = document.createElement('li');
  eachMovieItem.classList.add('movie');
  eachMovieItem.innerHTML = `
        <img class="movie-img" src=${eachMovie.Poster} />
        <div class="movie-info">
            <div class="title-rating">
                <p class="movie-title">${eachMovie.Title}</p>
                <p class="movie-rating"><i class="fa fa-star fa-stack"></i>${
                  eachMovie.imdbRating
                }
                </p>
            </div>
            <div class="time-genre-watchlist">
                <p class="runtime"> ${eachMovie.Runtime}</p>
                <p class="genre"> ${eachMovie.Genre}</p>
                <div class="movie-watchlist">
                    <button class="add-button" >
                        <i class="fa-solid fa-plus plus-icon" data-id=${
                          eachMovie.imdbID
                        }></i>
                        <i class="fa-solid fa-minus minus-icon hidden-icon" data-id=${
                          eachMovie.imdbID
                        }></i>
                    </button>
                    <p>${eachMovie.watchList ? 'Remove' : 'WatchList'}</p>
                </div>
            </div>
            <div class="movie-plot">
                <p>${eachMovie.Plot}</p>
            </div>
        </div>
        `;

  item.appendChild(eachMovieItem);
}
