import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RequestParameters } from './utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  get(
    url: string,
    parameters: RequestParameters[] = [],
    nocache: boolean = false,
    doCatchError: boolean = false,
    responseType: any = 'json'
  ) {
    url = `${environment.moviesApiUrl}${url}`;

    let httpParams = new HttpParams();
    for (const parameter of parameters) {
      httpParams = httpParams.set(parameter.label, parameter.data);
    }

    if (nocache) {
      httpParams = httpParams.set('nocache', true.toString());
    }

    if (doCatchError) {
      return this.httpClient
        .get(url, { params: httpParams, responseType })
        .pipe(
          catchError((err: any) => {
            return of(null);
          })
        );
    }

    return this.httpClient.get(url, {
      params: httpParams,
      responseType: responseType,
    });
  }
}
