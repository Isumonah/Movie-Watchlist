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
         <div class="sm:hidden title-rating">
          <p class="movie-title font-bold text-center text-[18px] sm:text-[20px] lg:text-[22px] xl:text-[24px] whitespace-nowrap w-10/12 mx-auto">${eachMovie.Title} 
          </p>
        </div>

        <div class="sm:flex">
          <div class="movie-img-div mt-6 sm:mt-0 w-[80%] sm:h-[80%] sm:w-auto object-cover rounded mx-auto flex">
            <img class="movie-img w-[100%] h-[100%] border-2 rounded" src=${eachMovie.Poster} />
        </div>

        <div class="movie-info flex flex-col justify-between p-[5px] ml-[21px] text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[22px] my-4 sm:my-0 sm:justify-center">

          <div class="hidden sm:block">
            <div class="flex justify-evenly sm:w-[65%] md:w-[55%] items-start">
                <p class="movie-title font-bold text-[16px] sm:text-[18px] lg:text-[20px] xl:text-[24px] w-full ">${eachMovie.Title}
                </p>
                <p class="movie-rating text-[#111827] font-bolder flex items-center sm:text-[14px] lg:text-[16px] xl:text-[18px]">
                  <i class="fa fa-star fa-stack text-[#fec654] w-[15px] pr-[20px]"></i>${eachMovie.imdbRating}
                </p>
            </div>
          </div>

          <div class="time-genre-watchlist flex items-start justify-between w-10/12 sm:w-full md:w-10/12 lg:w-[70%] text-[12px] sm:text-[14px] lg:text-[16px] xl:text-[18px] text-[#111827] sm:mt-2">
            <p class="runtime"> ${eachMovie.Runtime}</p>
            <p class="genre"> ${eachMovie.Genre}</p>
            <div class="movie-watchlist flex whitespace-nowrap justify-between">
              <p class="movie-rating text-[#111827] font-bolder flex sm:hidden">
                <i class="fa fa-star fa-stack  text-[#fec654] w-[15px] pr-[10px] leading-[20px]"></i>
                ${eachMovie.imdbRating}
              </p>
            </div>
          </div>

          <div class="movie-plot mt-4 sm:mt-2 w-10/12 sm:w-full md:w-10/12 text-[#6B7280]">
            <p> A recently divorced man meets an emotionally devastated widow and they begin a love affair.
            </p>      
          </div>
        </div>
      </div>
        `;

  displayFavourite.appendChild(eachMovieItem);
}
