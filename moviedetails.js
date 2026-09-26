const params = new URLSearchParams(location.search);
const imdbID = params.get("id");
const movieDetails = document.querySelector("#movie-detail")


if (imdbID) {
    searchMovie(imdbID.trim())
}

async function searchMovie(movieName) {

    let response = await fetch(`http://www.omdbapi.com/?apikey=7a2a8e0d&i=${movieName}&plot=full`);
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

    // movieDetails.innerHTML = `
    //    <div>
    //         <img src="${data.Poster}" alt="">
    //     </div>
        
      
    //         <h2>${data.Title}</h2>
    //         <section>
    //             <p>${data.Title}</p>
    //             <p>${data.Released}</p>
    //             <p>${data.imdbRating}</p>
    //             <p>${data.Language}</p>
    //             <p>${data.Runtime}</p>
    //         </section>
    //         <div>
    //             <p>Plot Overview</p>
    //             <p>${data.Plot}</p>
                

    //         </div>
    //         <div>
    //             <section>
    //                 <p>Director</p>
    //                 <p>${data.Director}</p>
    //             </section>
    //             <section>
    //                 <P>Writer</P>
    //                 <p>${data.Writer}</p>
    //             </section>

    //             <section> <button > View On imDB </button> <section>
    //         </div>
    //     </div>
   
        


