function Card({ movie, imageBase }) {
  const posterSrc = movie.poster_path ? imageBase + movie.poster_path : ''
  const posterClass = movie.poster_path ? '' : 'blank-poster'
  return (
    <div className="movie-card">
      <img src={posterSrc} alt={movie.title} className={posterClass} />
      <h3>{movie.title}</h3>
      <p>Release: {movie.release_date || 'N/A'}</p>
      <p>Rating: {movie.vote_average ?? 'N/A'}</p>
    </div>
  )
}

export default function Movies({ movies, imageBase }) {
  if (!movies?.length) {
    return (
      <div className="movies-container">
        <p>No movies found.</p>
      </div>
    )
  }

  return (
    <div className="movies-container">
      {movies.map((m) => (
        <Card key={m.id} movie={m} imageBase={imageBase} />
      ))}
    </div>
  )
}
