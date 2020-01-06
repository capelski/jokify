import $ from 'jquery';
import { animateJoke, animateSymbols, randomColorize, insertParabolas } from './common';
import '../style/main.scss';

document.addEventListener("DOMContentLoaded", (event) => {
    const jokifier = document.getElementById('jokify');
    const joke = document.getElementById('joke');    
    let nextJoke;

    function getNextJoke() {
        $.ajax({
            method: 'get',
            url: '/random?$modena=jokify-api'
        })
        .then((randomJoke) => {
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
    })
    .then(firstJoke => {
        joke.innerHTML = firstJoke;
        jokify();
    })
});
