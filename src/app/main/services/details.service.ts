import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ModalService } from 'src/app/components/modal/services/modal.service';
import { ApiService } from 'src/app/services/api.service';
import { formatCurrency, MovieDetail, MovieDetails, pluralize } from './utils';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private apiEndpoint = '/api/movies';

  id: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  modalRef: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  fetch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  data: BehaviorSubject<MovieDetails> = new BehaviorSubject<MovieDetails>(
    null!
  );

  constructor(
    private apiService: ApiService,
    private modalService: ModalService
  ) {
    this.id.subscribe(() => {
      this.reset();
    });

    this.fetch
      .pipe(
        filter(() => {
          if (this.id.value) {
            return true;
          }

          return false;
        }),
        switchMap((x) => {
          return this.getData();
        })
      )
      .subscribe(
        (data: any) => {
          if (data) {
            this.data.next(this.formatData(data));
          } else {
            this.data.next(null!);
          }

          this.createModal();
          this.loadingData.next(false);
        },
        (_error: any) => {
          this.data.next(null!);
          this.loadingData.next(false);
        }
      );

    this.reset();
  }

  reset() {
    this.data.next(null!);
    this.fetch.next(true);
  }

  private createModal() {
    if (this.data.value && this.modalRef) {
      this.modalService
        .openModal(
          this.modalRef.value,
          this.data.value.title,
          this.getModalBody()
        )
        .subscribe((v) => {});
    }
  }

  private getModalBody() {
    const body: MovieDetail[] = [];

    body.push(new MovieDetail('Year', this.data.value.year));
    body.push(
      new MovieDetail(
        'Genre',
        this.cleanCommaSeparatedString(this.data.value.genre, ', ')
      )
    );
    body.push(
      new MovieDetail(
        'Description',
        this.cleanCommaSeparatedString(this.data.value.description, ', ')
      )
    );
    body.push(
      new MovieDetail(
        'Director',
        this.cleanCommaSeparatedString(this.data.value.director, ', '),
        {
          type: 'inline',
          color: '#00BAFF',
        }
      )
    );
    body.push(
      new MovieDetail(
        'Actors',
        this.cleanCommaSeparatedString(this.data.value.actors, ', '),
        {
          type: 'inline',
          color: '#00BAFF',
        }
      )
    );
    body.push(
      new MovieDetail(
        'Runtime',
        this.addDurationMarkToRuntime(this.data.value.runtime)
      )
    );
    body.push(new MovieDetail('Rating', this.data.value.rating));
    body.push(new MovieDetail('Votes', this.data.value.votes));
    body.push(
      new MovieDetail(
        'Revenue',
        this.data.value.revenue
          ? this.displayRevenue(this.data.value.revenue)
          : 'N/A'
      )
    );
    body.push(new MovieDetail('Metascore', this.data.value.metascore));

    return body;
  }

  private displayRevenue(revenue: number): string {
    const revenueInMillions: number = Math.round(revenue * 1000000);

    return formatCurrency(revenueInMillions);
  }

  private addDurationMarkToRuntime(runtime: number): string {
    return `${runtime} ${pluralize(runtime, 'min')}`;
  }

  private cleanCommaSeparatedString(str: string, option: string): string {
    return str.split(',').join(option);
  }

  private getData() {
    this.loadingData.next(true);

    return this.apiService.get(`${this.apiEndpoint}/${this.id.value}`, []);
  }

  private formatData(data: any): MovieDetails {
    return {
      id: data.id,
      title: data.title,
      year: data.year,
      rank: data.rank,
      revenue: data.revenue,
      genre: data.genre,
      description: data.description,
      director: data.director,
      actors: data.actors,
      runtime: data.runtime,
      rating: data.rating,
      votes: data.votes,
      metascore: data.metascore,
    } as MovieDetails;
  }
}
