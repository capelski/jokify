document.addEventListener("DOMContentLoaded", function(event) {

    var searcher = document.getElementById('searcher');
    var jokes = document.getElementById('jokes');
    var filter = document.getElementById('filter');

    function getFilteredJokes() {
        animateJoke(jokes);
        randomColorize();
        animateSymbols();
        $.ajax({
            method: 'get',
            url: `/api/filter?$modena=jokify&text=${filter.value}`
        })
        .then(randomJokes => {
            if (randomJokes.length === 0) {
                jokes.innerHTML = 'Oooops! Parece que no hay resultados';
            }
            else {
                jokes.innerHTML = randomJokes.join('<br /><br />');
            }
            jokes.scrollTo({ top: 0 });
        });
    }

    searcher.addEventListener('click', getFilteredJokes);
    randomColorize();
});
