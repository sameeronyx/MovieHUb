const movieSearch = document.querySelector("#movieForm");
const movieInput = document.querySelector("#MovieInput");
const movieHub = document.querySelector("#movieHub")

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
    let response = await fetch(`http://www.omdbapi.com/?apikey=7a2a8e0d&s=${movieName}`);
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


        const div = document.createElement("div")
        div.dataset.imdbID = movie.imdbID
        div.setAttribute("class", "movieCard")
        div.innerHTML =
            `<div>
                <img src="${movie.Poster}" alt="">
            </div>
            <div>
                <p>${movie.Title}</p>
                <p>${movie.Year}</p>
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
    console.log(imdbID);


})