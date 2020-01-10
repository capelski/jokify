import $ from 'jquery';
import '../style/main.scss';
import { animateJoke, animateSymbols, insertParabolas, randomColorize } from './common';

document.addEventListener('DOMContentLoaded', () => {
    const searcher = document.getElementById('searcher')!;
    const jokes = document.getElementById('jokes')!;
    const filter = document.getElementById('filter') as HTMLInputElement;

    function getFilteredJokes() {
        const updatedUrl = window.location.href.split('?')[0] + `?text=${filter.value}`;
        window.history.replaceState(null, document.title, updatedUrl);
        animateJoke(jokes);
        randomColorize();
        animateSymbols();
        $.ajax({
            method: 'get',
            url: `/filter?$modena=jokify-api&text=${filter.value}`
        }).then(randomJokes => {
            jokes.innerHTML =
                randomJokes.length === 0
                    ? 'Oooops! Parece que no hay resultados'
                    : randomJokes.join('<br /><br />');
            jokes.scrollTo({ top: 0 });
        });
    }

    insertParabolas();

    // Check for the first url parameter and perform a search with it's value
    if (window.location.search) {
        const textValue = window.location.search.substr(1).split('=')[1];
        filter.value = textValue;
        getFilteredJokes();
    }

    function keyDownTextField(event: KeyboardEvent) {
        if (event.target === filter && event.keyCode === 13) {
            getFilteredJokes();
        }
    }
    document.addEventListener('keydown', keyDownTextField, false);

    searcher.addEventListener('click', getFilteredJokes);
    randomColorize();
});
