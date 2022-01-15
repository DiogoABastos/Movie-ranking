import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { RequestParameters } from 'src/app/services/utils';
import { MoviesData } from './utils';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private page = 0;
  private limit = 10;
  private apiEndpoint = '/api/movies';

  top10: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  top10PerYear: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  fetch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  data: BehaviorSubject<MoviesData[]> = new BehaviorSubject<MoviesData[]>([]);

  allowLoadMore: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private apiService: ApiService) {
    this.top10.subscribe(() => {
      this.reset();
    });
    this.top10PerYear.subscribe(() => {
      this.reset();
    });

    this.fetch
      .pipe(
        switchMap((x) => {
          return this.getData();
        })
      )
      .subscribe(
        (data: any) => {
          data = data.content;
          if (data && data.length > 0) {
            this.data.next(this.data.value.concat(this.formatData(data)));
          } else {
            this.data.next([]);
          }

          this.allowLoadMore.next(data && data.length === this.limit);
          this.loadingData.next(false);
        },
        (_error: any) => {
          this.data.next([]);
          this.allowLoadMore.next(false);
          this.loadingData.next(false);
        }
      );

    this.reset();
  }

  loadMore() {
    this.page += 1;
    this.fetch.next(true);
  }

  reset(withFilters: boolean = false) {
    if (withFilters) {
      this.top10.next(false);
      this.top10PerYear.next(false);
    }

    this.data.next([]);
    this.fetch.next(true);
  }

  private getData() {
    this.loadingData.next(true);
    const parameters: RequestParameters[] = [];
    parameters.push(new RequestParameters('size', this.limit));
    parameters.push(new RequestParameters('page', this.page));

    // if (this.top10.value) {
    //   parameters.push(new RequestParameters('rank', 10));
    // }

    // if (this.top10PerYear.value) {
    //   parameters.push(new RequestParameters('end', 2016));
    // }

    return this.apiService.get(this.apiEndpoint, parameters);
  }

  private formatData(data: any): MoviesData[] {
    if (data && data.length > 0) {
      return data.map((item: any) => {
        return {
          id: item.id,
          title: item.title,
          year: item.year,
          rank: item.rank,
          revenue: item.revenue,
        } as MoviesData;
      });
    }
    return [];
  }
}
