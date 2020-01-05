document.addEventListener("DOMContentLoaded", function(event) {

    var searcher = document.getElementById('searcher');
    var jokes = document.getElementById('jokes');
    var filter = document.getElementById('filter');

    function getFilteredJokes() {
        const updatedUrl = window.location.href.split('?')[0] + `?text=${filter.value}`;
        window.history.replaceState(null, null, updatedUrl);
        animateJoke(jokes);
        randomColorize();
        animateSymbols();
        $.ajax({
            method: 'get',
            url: `/filter?$modena=jokify-api&text=${filter.value}`
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

    // Check for the first url parameter and perform a search with it's value
    if (window.location.search) {
        const textValue = window.location.search.substr(1).split('=')[1];
        filter.value = textValue;
        getFilteredJokes();
    }

    function keyDownTextField(e) {
        if(e.target === filter && e.keyCode === 13) {
            getFilteredJokes();
        }
    }
    document.addEventListener('keydown', keyDownTextField, false);

    searcher.addEventListener('click', getFilteredJokes);
    randomColorize();
});
