import { memo } from "react";
import { MovieCard } from "./MovieCard";

type MovieProps = {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
};

type GenreResponseProps = {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
};

interface IContent {
  movies: MovieProps[];
  genre: GenreResponseProps;
}

function ContentComponent({ movies, genre }: IContent) {
  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {genre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export const Content = memo(ContentComponent, (prev, next) => {
  return prev.genre.id === next.genre.id;
});
