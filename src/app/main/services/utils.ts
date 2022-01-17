export interface MoviesData {
  id: string;
  title: string;
  year: number;
  rank: number;
  revenue: number;
}

export interface MovieDetails {
  id: string;
  title: string;
  year: number;
  rank: number;
  revenue: number;
  genre: string;
  description: string;
  director: string;
  actors: string;
  runtime: number;
  rating: number;
  votes: number;
  metascore: number;
}

export class MovieDetail {
  constructor(
    public title: string,
    public info: string | number,
    public data?: any
  ) {}
}

export function formatNumber(digit: number, delimiter: string = ','): string {
  return digit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
}

export function formatCurrency(
  digit: number,
  delimiter: string = ',',
  currency: string = '$'
): string {
  return currency + formatNumber(digit, delimiter);
}

export function pluralize(digit: number, str: string): string {
  if (digit === 1) {
    return str;
  }

  return str + 's';
}
