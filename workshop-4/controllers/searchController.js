const { getAllMovies } = require('../services/movie');

module.exports = {
    searchController: async (req, res) => {
        const movies = await getAllMovies();
        const { title, genre, year } = req.query;
        let filteredMovies = movies;

        if (title) {
            filteredMovies = filteredMovies.filter(m => m.title.toLowerCase().includes(title.toLowerCase()));
        }

        if (genre) {
            filteredMovies = filteredMovies.filter(m => m.genre.toLowerCase().includes(genre.toLowerCase()));
        }

        if (year) {
            filteredMovies = filteredMovies.filter(m => m.year == year);
        }

        res.render('search', { movies: filteredMovies });
    }
};