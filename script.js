const movieSearch = document.querySelector("#movieForm");
const movieInput = document.querySelector("#MovieInput");
const movieHub = document.querySelector("#movieHub");
const hamBurger = document.querySelector("#hamBurger");
const navBar = document.querySelector("#nav-bar");


hamBurger.addEventListener("click",(e)=>{
    e.preventDefault();
    navBar.classList.toggle("hidden");

})

const featuredGrid = document.querySelector("#featuredGrid");
const defaultMovies = ["Inception", "Interstellar", "The Dark Knight", "Pulp Fiction"];

window.addEventListener("DOMContentLoaded", loadFeaturedMovies);

async function loadFeaturedMovies() {
    const results = await Promise.all(
        defaultMovies.map(title =>
            // this is free api no worry
            fetch(`https://www.omdbapi.com/?apikey=7a2a8e0d&t=${encodeURIComponent(title)}`)
                .then(res => res.json())
        )
    );
    displayFeatured(results.filter(movie => movie.Response === "True"));
}

function displayFeatured(movies) {
    featuredGrid.innerHTML = "";
    movies.forEach(movie => {
        const div = document.createElement("div");
        div.dataset.imdbID = movie.imdbID;
        div.setAttribute("class", "movieCard border border-white/10 rounded-sm p-4 flex flex-col gap-3 hover:border-yellow-600 transition-colors cursor-pointer");
        div.innerHTML = `
            <div class="w-full aspect-2/3 rounded-sm overflow-hidden bg-white/5">
                <img src="${movie.Poster}" alt="${movie.Title}" class="w-full h-full object-cover">
            </div>
            <div>
                <h3 class="font-serif text-slate-100 font-semibold">${movie.Title}</h3>
                <p class="text-slate-400 text-sm">${movie.Year}</p>
            </div>`;
        featuredGrid.append(div);
    });
}
featuredGrid.addEventListener("click", (e) => {
    e.stopPropagation();
    const movieCard = e.target.closest(".movieCard")
     if (!movieCard) return; 

    const imdbID = movieCard.dataset.imdbID;

    window.location.href = `movie_details.html?id=${imdbID}`
   

})






movieSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = movieInput.value.trim();
    if (!query) {
        return
    }
    console.log(query);
    searchMovie(query);
})

async function searchMovie(movieName) {
    movieHub.innerHTML = "<p>searching Movie ....</p>"
    let response = await fetch(`http://www.omdbapi.com/?apikey=7a2a8e0d&s=${encodeURIComponent(movieName)}`);
    let data = await response.json();
    console.log(data);
    if (data.Response === "True") {
        displayMovie(data.Search)

    }
    else {
        console.log(data.Error);

        movieHub.innerHTML = `<p>${data.Error}</p>`
    }


}

function displayMovie(data) {
    movieHub.innerHTML = ""
    data.forEach(movie => {
   const div = document.createElement("div");
        div.dataset.imdbID = movie.imdbID;
        div.setAttribute("class", "movieCard border border-white/10 rounded-sm p-4 flex flex-col gap-3 hover:border-yellow-600 transition-colors cursor-pointer");
        div.innerHTML = `
            <div class="w-full aspect-2/3 rounded-sm overflow-hidden bg-white/5">
                <img src="${movie.Poster}" alt="${movie.Title}" class="w-full h-full object-cover">
            </div>
            <div>
                <h3 class="font-serif text-slate-100 font-semibold">${movie.Title}</h3>
                <p class="text-slate-400 text-sm">${movie.Year}</p>
            </div>`

      

        movieHub.append(div)
    });
}

movieHub.addEventListener("click", (e) => {
    e.stopPropagation();
    const movieCard = e.target.closest(".movieCard")
     if (!movieCard) return; 

    const imdbID = movieCard.dataset.imdbID;

    window.location.href = `movie_details.html?id=${imdbID}`
   


})