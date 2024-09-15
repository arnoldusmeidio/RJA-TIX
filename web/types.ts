export interface User {
  id: number;
  name: string;
  email: string;
}

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

export interface Seat {
  row: number;
  column: number;
  studioId: number;
  booked: boolean;
}

export interface SeatInfo {
  seats: Seat[];
  price: Studios;
}
