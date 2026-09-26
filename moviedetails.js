const params = new URLSearchParams(location.search);
const imdbID = params.get("id");
const movieDetails = document.querySelector("#movie-detail")


if (imdbID) {
    searchMovie(imdbID.trim())
}

async function searchMovie(movieName) {

    // this is free api no worry friends

    let response = await fetch(`https://www.omdbapi.com/?apikey=7a2a8e0d&i=${movieName}&plot=full`);
    let data = await response.json();
    console.log(data);
    if (data.Response === "True") {
        displayMovie(data);


    }
    else {
        console.log(data.Error);

    }


}


    function displayMovie(data) {
    const poster = document.getElementById("moviePoster");
    poster.style.backgroundImage = `url(${data.Poster})`;
    poster.textContent = "";

    document.getElementById("movieTitle").textContent = data.Title;
    document.getElementById("movieReleased").textContent = data.Released;
    document.getElementById("movieRuntime").textContent = data.Runtime;
    document.getElementById("movieLanguage").textContent = data.Language;
    document.getElementById("movieRating").textContent = `IMDb ${data.imdbRating}`;

    document.getElementById("moviePlot").textContent = data.Plot;

    document.getElementById("movieDirector").textContent = data.Director;
    document.getElementById("movieWriter").textContent = data.Writer;
    document.getElementById("movieCast").textContent = data.Actors;

    document.getElementById("movieImdbBtn").addEventListener("click", () => {
    window.open(`https://www.imdb.com/title/${data.imdbID}`, "_blank");
});
}
        


