export interface Movie {
  id: number;
  title: string;
  director: string;
  posterUrl: any;
  rated: string;
  releaseYear: number;
  synopsis: string;
}

export interface Cinema {
  id: number;
  address: string;
  name: string;
  studios: Studios[];
}

export interface Studios {
  cinemaId: number;
  id: number;
  number: number;
  studioType: string;
  price: number;
  showtimes: Showtimes[];
}

export interface Showtimes {
  id: number;
  movieId: number;
  startTime: Date;
  studioId: number;
  movie: Movie;
}
