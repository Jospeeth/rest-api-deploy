const express = require("express");
const crypto = require("node:crypto");

const movies = require("./movies.json");
const { validateMovie, validatePartialMovie } = require("./schemas/movies");
const cors = require("cors");


const app = express();
app.disable("x-powered-by");
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://127.0.0.1:3000',
      'http://localhost:1234',
      'https://movies.com',
      'https://midu.dev'
    ];
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }

    if (!origin) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h1>Welcome ${res.status(200).statusCode}</h1>`);
});

app.get("/movies", (req, res) => {
  const { genre } = req.query;

  if (genre) {
    const moviesByGenre = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    if (moviesByGenre.length === 0) {
      return res.status(404).send("Movie not found");
    }
    return res.json(moviesByGenre);
  }

  res.json(movies);
});

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }

  const movie = movies.find((movie) => movie.title === result.data.title);
  if (movie) {
    return res.status(409).json({ error: "Movie already exists" });
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };
  movies.push(newMovie);

  return res.status(201).json(newMovie);
});

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }
  movies.splice(movieIndex, 1);
  return res.json({ message: "Movie deleted" });
});
app.patch("/movies/:id", (req, res) => {
  const result = validatePartialMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);
  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data,
  };
  movies[movieIndex] = updateMovie;
  return res.json(updateMovie);
});

app.get("/movies/:id", (req, res) => {
  //path-to-regexp
  const { id } = req.params;
  const movie = movies.find((m) => m.id === id);
  if (movie) res.json(movie);
  res.status(404).send("Movie not found");
});
const port = process.env.PORT || 1234;
app.listen(port, () => {
  console.log(`Server listening on port:  http://localhost:${port}`);
});
