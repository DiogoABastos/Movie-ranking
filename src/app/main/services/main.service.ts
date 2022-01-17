import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SelectEntry } from 'src/app/components/select/utils';
import {
  TableColumn,
  TableHeader,
  TableRow,
} from 'src/app/components/table/utils';
import { ApiService } from 'src/app/services/api.service';
import { RequestParameters } from 'src/app/services/utils';
import { formatCurrency, MoviesData } from './utils';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private limit = 20;
  private apiEndpoint = '/api/movies';

  top10: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  top10PerYearOptions: BehaviorSubject<SelectEntry[]> = new BehaviorSubject<
    SelectEntry[]
  >([
    new SelectEntry('All', null),
    new SelectEntry('2016', 2016),
    new SelectEntry('2015', 2015),
    new SelectEntry('2014', 2014),
    new SelectEntry('2013', 2013),
    new SelectEntry('2012', 2012),
    new SelectEntry('2011', 2011),
    new SelectEntry('2010', 2010),
    new SelectEntry('2009', 2009),
    new SelectEntry('2008', 2008),
    new SelectEntry('2007', 2007),
    new SelectEntry('2006', 2006),
    new SelectEntry('2005', 2005),
    new SelectEntry('2004', 2004),
    new SelectEntry('2003', 2003),
    new SelectEntry('2002', 2002),
    new SelectEntry('2001', 2001),
    new SelectEntry('2000', 2000),
  ]);
  top10PerYear: BehaviorSubject<SelectEntry> = new BehaviorSubject<SelectEntry>(
    this.top10PerYearOptions[0]
  );

  fetch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  data: BehaviorSubject<MoviesData[]> = new BehaviorSubject<MoviesData[]>([]);

  allowLoadMore: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  page: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  tableHeaders: BehaviorSubject<TableHeader[]> = new BehaviorSubject<
    TableHeader[]
  >([]);
  tableRows: BehaviorSubject<TableRow[]> = new BehaviorSubject<TableRow[]>([]);

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
          this.generateTableData();

          return this.getData();
        })
      )
      .subscribe(
        (data: any) => {
          const totalPages = data.totalPages;
          data = data.content;
          if (data && data.length > 0) {
            this.fillData(data);
          } else {
            this.data.next([]);
          }
          this.generateTableData();
          this.allowLoadMore.next(
            !this.top10.value && !this.top10PerYear.value
          );
          this.loadingData.next(false);
        },
        (_error: any) => {
          this.data.next([]);
          this.generateTableData();
          this.allowLoadMore.next(false);
          this.loadingData.next(false);
        }
      );

    this.reset();
  }

  fillData(data: MoviesData[]) {
    if (this.top10.value || this.top10PerYear.value) {
      data = this.filterDataByRevenue(data).slice(0, 10);
    }

    this.data.next(this.data.value.concat(this.formatData(data)));
  }

  filterDataByRevenue(data: MoviesData[]) {
    return data.sort((a: MoviesData, b: MoviesData) => b.revenue - a.revenue);
  }

  loadMore() {
    if (this.allowLoadMore.value) {
      this.page.next(this.page.value + 1);
      this.fetch.next(true);
    }
  }

  reset(withFilters: boolean = false) {
    if (withFilters) {
      this.top10.next(false);
      this.top10PerYear.next(this.top10PerYearOptions[0]);
    }

    this.generateTableData();
    this.page.next(0);
    this.data.next([]);
    this.fetch.next(true);
  }

  private getData() {
    this.loadingData.next(true);
    const parameters: RequestParameters[] = [];

    if (
      !this.top10.value &&
      !(this.top10PerYear.value && this.top10PerYear.value.value)
    ) {
      parameters.push(new RequestParameters('size', this.limit));
      parameters.push(new RequestParameters('page', this.page.value));
    }

    if (this.top10PerYear.value && this.top10PerYear.value.value) {
      parameters.push(
        new RequestParameters('start', this.top10PerYear.value.value)
      );

      parameters.push(
        new RequestParameters('end', this.top10PerYear.value.value)
      );
    }

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

  private displayRevenue(revenue: number): string {
    const revenueInMillions: number = revenue * 1000000;

    return formatCurrency(revenueInMillions);
  }

  private generateTableData() {
    const headers: TableHeader[] = [];
    headers.push(new TableHeader(headers.length + 1, 'ranking', 'Ranking'));
    headers.push(new TableHeader(headers.length + 1, 'title', 'Title'));
    headers.push(new TableHeader(headers.length + 1, 'year', 'Year'));
    headers.push(new TableHeader(headers.length + 1, 'revenue', 'Revenue'));
    headers.push(new TableHeader(headers.length + 1, 'details', ''));

    const rows: TableRow[] = [];
    this.data.value.map((item: MoviesData) => {
      const columns: TableColumn[] = [];
      columns.push(
        new TableColumn(columns.length + 1, 'ranking', 'number', item.rank)
      );
      columns.push(
        new TableColumn(columns.length + 1, 'title', 'text', item.title)
      );
      columns.push(
        new TableColumn(columns.length + 1, 'year', 'text', item.year)
      );
      columns.push(
        new TableColumn(
          columns.length + 1,
          'revenue',
          'text',
          this.displayRevenue(item.revenue)
        )
      );
      columns.push(
        new TableColumn(columns.length + 1, 'details', 'modal', {
          src: 'assets/images/eye.svg',
          data: item.id,
        })
      );

      rows.push(new TableRow(rows.length + 1, item.id, columns));
    });

    this.tableHeaders.next(headers);
    this.tableRows.next(rows);
  }
}
