const express = require('express')
const app = express()
const port = 3000

const exphb = require('express-handlebars')
const movieList = require('./movies.json')

app.engine('handlebars', exphb({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const filteredMovies = movieList.results.filter(movie => movie.title.toLowerCase().includes(keyword.toLowerCase()))
  res.render('index', { movies: filteredMovies, keyword: keyword })
})

app.get('/movies/:id', (req, res) => {
  // toString()較好 因為Number(null)為0
  const id = req.params.id
  const movie = movieList.results.find(movie => movie.id.toString() === id)
  res.render('show', { movie: movie })
})
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
