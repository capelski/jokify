var jokesService = require('../services/joke-service');

function JokeController() {
	function filteredJokes(req, res, next) {
		var filter = req.query && req.query.text;
		var jokes = [];
		if (filter) {
			jokes = jokesService.getFilteredJokes(filter);
		}
		res.json(jokes);
	}

	function indexView(req, res, next) {
		req.session.excludedIndexes = req.session.excludedIndexes || [];
		var randomJoke = jokesService.getRandomJoke(req.session.excludedIndexes);
		res.render('index', {
			joke: randomJoke
		});
	}

	function randomJoke(req, res, next) {
		req.session.excludedIndexes = req.session.excludedIndexes || [];
		var randomJoke = jokesService.getRandomJoke(req.session.excludedIndexes);
		res.json(randomJoke);
	}

	return {
		filteredJokes,
		indexView,
		randomJoke
	};
}

module.exports = JokeController();
