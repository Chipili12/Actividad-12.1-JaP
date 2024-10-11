const API_URL = "https://japceibal.github.io/japflix_api/movies-data.json";
let jsonData = [];
let movieList = document.getElementById("lista");
let button = document.getElementById("btnBuscar");
let input = document.getElementById("inputBuscar");

document.addEventListener("DOMContentLoaded", () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      jsonData = data;
    })
    .catch((error) => {
      console.log(error);
    });
});

button.addEventListener("click", () => {
  console.log(jsonData)
  let listOfMovies = [];
  let inputCompare = input.value.toLowerCase()
  listOfMovies = jsonData.filter((movie) => {
    let filteredMovies = movie.title.toLowerCase().includes(inputCompare) || movie.tagline.toLowerCase().includes(inputCompare) || movie.overview.toLowerCase().includes(inputCompare) || movie.genres.map((genre) => genre.name).join(", ").toLowerCase().includes(inputCompare)
    return filteredMovies
  })
  movieList.innerHTML = "";
  for (const movie of listOfMovies) {
    let card = document.createElement("li");
    card.classList.add("text-white", "list-group-item", "bg-dark");
    card.innerHTML = `  
    <div class="" type="button" onclick="setItemID(${movie.id})">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex justify-content-between">
            <h5 style="font-weight: bold">${movie.title}</h5>   
            <p class="card-text star-rating">
              ${'<i class="bi bi-star-fill"></i>'.repeat(Math.round(movie.vote_average / 2))}${'<i class="bi bi-star"></i>'.repeat(5 - Math.round(movie.vote_average / 2))}
            </p>     
          </div> 
          <p class="text-muted" style="font-style: italic">
          ${movie.tagline}
          </p>
        </div>
      </div>
    </div>`;
    movieList.appendChild(card);
  }
});

function setItemID(id) {
  const selectedMovie = jsonData.find(movie => movie.id === id)
  document.getElementById('offcanvasTopLabel').innerHTML = selectedMovie.title;
  document.getElementById('offcanvasOverview').innerHTML = selectedMovie.overview;
  document.getElementById('offcanvasGenre').innerHTML = selectedMovie.genres.map(genre => genre.name).join(' - ');
  document.getElementById('offcanvasButton').innerHTML = `
      <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              More
          </button>
          <ul class="dropdown-menu px-3 pt-3" aria-labelledby="dropdownMenuButton">
              <li class="d-flex justify-content-between">Year: <p>${selectedMovie.release_date.split('-')[0]}</p></li>
              <li class="d-flex justify-content-between">Runtime: <p>${selectedMovie.runtime} mins</p></li>
              <li class="d-flex justify-content-between">Budget: <p>$${selectedMovie.budget}</p></li>
              <li class="d-flex justify-content-between">Revenue: <p> $${selectedMovie.revenue}</p></li>
          </ul>
      </div>
    `;
  
  console.log(selectedMovie)
  let offcanvasElement = document.getElementById('offcanvasTop');
  let offcanvas = new bootstrap.Offcanvas(offcanvasElement);
  offcanvas.toggle();
}
