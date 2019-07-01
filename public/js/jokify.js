document.addEventListener("DOMContentLoaded", function(event) {
    const jokifier = document.getElementById('jokify');
    const joke = document.getElementById('joke');    
    let nextJoke;

    function getNextJoke() {
        $.ajax({
            method: 'get',
            url: '/api/random?$modena=jokify'
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
    jokify();
});
