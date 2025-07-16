const fetch = require('node-fetch');

exports.getMovies = async (req, res) => {
  const { page = 1 } = req.query;
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    res.status(500).send('Server error');
  }
}; 