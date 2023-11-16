const form = document.getElementById('search-form');
let searchInput = document.getElementById('search-input');
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

  sessionStorage.removeItem('movieSearchPage');

  const newPlusBtn = document.querySelectorAll('.plus-icon');
  const newMinusBtn = document.querySelectorAll('.minus-icon');
  movieArray = JSON.parse(localStorage.getItem('movie'));

  newPlusBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      const datasetID = e.currentTarget.dataset.id;

      movieArray = JSON.parse(localStorage.getItem('movie'));

      item.classList.add('hidden-icon');
      item.classList.remove('show-icon');

      const minusBtn = e.target.nextElementSibling;

      let watchlistRemove = minusBtn.nextElementSibling;
      watchlistRemove.innerHTML = 'Remove';

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

  newMinusBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const datasetID = e.target.dataset.id;
      const plusBtn = e.target.previousElementSibling;
      let watchlistRemove = e.target.nextElementSibling;
      watchlistRemove.innerHTML = 'Watchlist';

      plusBtn.classList.remove('hidden-icon');
      plusBtn.classList.add('show-icon');
      e.target.classList.remove('show-icon');
      e.target.classList.add('hidden-icon');

      e.target.removeEventListener('click', removeMovie);

      movieArray = movieArray.filter((item) => {
        return item.imdbID !== datasetID;
      });
      localStorage.setItem('movie', JSON.stringify(movieArray));
    });
  });
}

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
      display.innerHTML = '';
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
        display.innerHTML = `<p class="initial-display" style="font-weight: bold; color:black"> No Item Found </p>`;
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
    let watchlistRemove = item.querySelector('.watchlist-remove');
    plusIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      watchlistRemove.innerHTML = 'Remove';
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
  let watchlistRemove = e.target.nextElementSibling;
  watchlistRemove.innerHTML = 'Watchlist';
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
  const eachMovieItem = document.createElement('div');
  eachMovieItem.classList.add('movie');
  eachMovieItem.innerHTML = `
        <div class="sm:hidden title-rating">
          <p class="movie-title font-bold text-center text-[18px] sm:text-[20px] lg:text-[22px] xl:text-[24px] w-10/12 mx-auto">${eachMovie.Title} 
          </p>
        </div>

        <div class="sm:flex">
          <div class="movie-img-div mt-6 sm:mt-0 w-[80%] sm:h-[80%] sm:w-auto object-cover rounded mx-auto flex">
            <img class="movie-img w-[100%] h-[100%] border-2 rounded" src=${eachMovie.Poster} />
        </div>

        <div class="movie-info flex flex-col justify-between p-[5px] ml-[21px] text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[22px] my-4 sm:my-0 sm:justify-center">

          <div class="hidden sm:block">
            <div class="flex justify-evenly sm:w-[70%] md:w-[55%] items-start space-x-4">
                <p class="movie-title font-bold text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[24px] w-full">${eachMovie.Title}
                </p>
                <p class="movie-rating text-[#111827] font-bolder flex items-center sm:text-[14px] lg:text-[16px] xl:text-[18px]">
                  <i class="fa fa-star fa-stack text-[#fec654] w-[15px] pr-[25px]"></i>${eachMovie.imdbRating}
                </p>
            </div>
          </div>

          <div class="time-genre-watchlist flex justify-between w-11/12 sm:w-full md:w-10/12 lg:w-[70%] text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] text-[#111827] sm:mt-2 items-start leading-[25px]">
            <p class="runtime mr-2"> ${eachMovie.Runtime}</p>
            <p class="genre mr-2"> ${eachMovie.Genre}</p>

            <div class="hidden sm:block">
              <button class="movie-watchlist flex justify-between add-button items-center">

                <i class="plus-icon fa-solid fa-plus p-[4px] rounded-full bg-[#111827] text-white hover:scale(1.5)"  data-id=${eachMovie.imdbID}></i>
                
                <i class="minus-icon hidden-icon fa-solid fa-minus p-[4px] rounded-full bg-[#111827] text-white hover:scale(1.1)" data-id=${eachMovie.imdbID}></i>

                <p class="watchlist-remove ml-2">Watchlist</p>
              </button>
            </div>

            <div class="movie-watchlist flex justify-between text-[12px] items-start">
              <p class="movie-rating text-[#111827] font-bolder flex items-start sm:hidden">
                <i class="fa fa-star fa-stack text-[#fec654] w-[15px] pr-[18px]"></i>
                ${eachMovie.imdbRating}
              </p>
            </div>
          </div>

          <div class="movie-plot mt-4 sm:mt-2 w-10/12 sm:w-full md:w-10/12 text-[#6B7280]">
            <p> A recently divorced man meets an emotionally devastated widow and they begin a love affair.
            </p>      
          </div>
          <div class="add-button mt-4 w-8/12 mx-auto rounded sm:hidden text-[13px]" data=${eachMovie.imdbID}>
            <button class="plus-icon bg-black text-white p-2 w-full hover:scale(1.1)" data-id=${eachMovie.imdbID}>Add to Watchlist</button>
            <button class="minus-icon hidden-icon text-black border-2 border-black p-2 hover:scale(1.1)" data-id=${eachMovie.imdbID}>Remove from Watchlist</button>
          </div>
        </div>
      </div>
    `;

  item.appendChild(eachMovieItem);
}
