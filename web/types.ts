export interface User {
  id: number;
  name: string;
  email: string;
  wallet: {
    balance: number;
  };
  totalPoints: number;
  vouchers: {
    id: number;
    discount: number;
  }[];
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
  studioId: number;
  seats: Seat[];
  price: Studios;
  movieId: number;
  movieTitle: string;
  studioType: string;
}

export interface BookingData {
  row: number;
  column: number;
  movieId: number;
  movieTitle: string;
  price: number;
  studioId: number;
  studioType: string;
  showtimeId: number;
}

export interface AdminVoucher {
  availability: number;
  discount: number;
  id: string;
  expiredAt: string;
}
