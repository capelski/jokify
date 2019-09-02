var jokesService = require('../services/joke-service');

const filteredJokes = (req, res, next) => {
	var filter = req.query && req.query.text;
	var jokes = [];
	if (filter) {
		jokes = jokesService.getFilteredJokes(filter);
	}
	res.json(jokes);
};

const searchView = (req, res, next) => res.render('search');

const indexView = (req, res, next) => {
	req.session.excludedIndexes = req.session.excludedIndexes || [];
	var randomJoke = jokesService.getRandomJoke(req.session.excludedIndexes);
	res.render('index', {
		joke: randomJoke
	});
};

const randomJoke = (req, res, next) => {
	req.session.excludedIndexes = req.session.excludedIndexes || [];
	var randomJoke = jokesService.getRandomJoke(req.session.excludedIndexes);
	res.json(randomJoke);
};

module.exports = {
	filteredJokes,
	searchView,
	indexView,
	randomJoke
};
