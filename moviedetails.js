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

    movieDetails.innerHTML = `
       <div>
            <img src="${data.Poster}" alt="">
        </div>
        
      
            <h2>${data.Title}</h2>
            <section>
                <p>${data.Title}</p>
                <p>${data.Released}</p>
                <p>${data.imdbRating}</p>
                <p>${data.Language}</p>
                <p>${data.Runtime}</p>
            </section>
            <div>
                <p>Plot Overview</p>
                <p>${data.Plot}</p>
                

            </div>
            <div>
                <section>
                    <p>Director</p>
                    <p>${data.Director}</p>
                </section>
                <section>
                    <P>Writer</P>
                    <p>${data.Writer}</p>
                </section>
            </div>
        </div>
   
        
`
}
