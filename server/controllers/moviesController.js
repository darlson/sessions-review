module.exports = {
  getAllMovies: async (req, res) => {
    const db = req.app.get('db')
    const movies = await db.movies.find()

    res.status(200).send(movies)
  },
  getMovieById: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    
    try{
      const [movie] = await db.movies.find({ id })
  
      if(movie) {
        res.status(200).send(movie)
      } else {
      res.status(404).send('Movie not found')
      }
    } catch(err) {
      console.log(err);
      res.status(500).send('Did a boo boo')
    }
  },
  addMovie: async (req, res) => {
    const db = req.app.get('db')
    const {title, rating, year} = req.body
    const newMovie = await db.movies.insert({ title, rating, year })

    res.status(200).send(newMovie)
  },
  deleteMovie: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    await db.movies.destroy({id})
    res.status(200).send('Deleted movie')
  },
}
