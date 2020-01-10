import $ from 'jquery';
import '../style/main.scss';
import { animateJoke, animateSymbols, insertParabolas, randomColorize } from './common';

document.addEventListener('DOMContentLoaded', () => {
    const jokifier = document.getElementById('jokify')!;
    const joke = document.getElementById('joke')!;
    let nextJoke: string;

    function getNextJoke() {
        $.ajax({
            method: 'get',
            url: '/random?$modena=jokify-api'
        }).then(randomJoke => {
            nextJoke = randomJoke;
        });
    }

    function jokify() {
        joke.innerHTML = nextJoke || joke.innerHTML;
        randomColorize();
        animateSymbols();
        animateJoke(joke);
        getNextJoke();
    }

    jokifier.addEventListener('click', jokify);

    insertParabolas();
    $.ajax({
        method: 'get',
        url: '/random?$modena=jokify-api'
    }).then(firstJoke => {
        joke.innerHTML = firstJoke;
        jokify();
    });
});
