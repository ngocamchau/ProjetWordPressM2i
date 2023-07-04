const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

let search = "";
let movies = [];

const testPopularity = (popularity) => {
    let string = "";
    if (popularity < 50) {
        string = `<p>Popularité : ${popularity} ⭐️</p>`;
    } else if (popularity > 50 && popularity < 100) {
        string = `<p>Popularité : ${popularity} ⭐️⭐️</p>`;
    } else if (popularity > 100) {
        string = `<p>Popularité : ${popularity} ⭐️⭐️⭐️</p>`;
    }

    return string;
};

const fetchMovies = async () => {
    movies = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=fc35fa2ae200a1b66133d6fbd9bac889&query=${search}`
    ).then((res) => res.json());
    console.log(movies);
};

const moviesDisplay = async () => {
    await fetchMovies();

    movies.results.length = 12;

    result.innerHTML = movies.results
        .map(
            (movie) =>
                `
            <li>
                <h2>${movie.original_title}</h2>
                <div class="card-content">
                    <img src="https://image.tmdb.org/t/p/w500${
                        movie.poster_path
                    }"></img>
                    <div class="infos">
                        <p>${movie.overview}</p>
                        ${testPopularity(movie.popularity)}
                    </div>
                </div>
            </li>
        `
        )
        .join("");
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    search = searchInput.value;
    moviesDisplay();
});
