const { configureEndpoints } = require('modena');
const jokesController = require('./controllers/joke-controller');

module.exports = configureEndpoints((router, config, middleware) => {
	router.get('/', middleware.session, jokesController.indexView);
	router.get('/random', middleware.session, jokesController.randomJoke);
});
