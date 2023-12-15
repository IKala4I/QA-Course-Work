import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs';
import {Errors, SeparatedErrors} from '../shared/interfaces/errors';
import {BASE_URL} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  constructor(private http: HttpClient) {
  }

  getAggregatedStatistics() {
    return this.http.get<Errors>(BASE_URL).pipe(
      map(errors => {
        const newErrors: Errors = {
          label: 'Aggregated Statistics',
          ...errors
        };
        return [newErrors];
      })
    );
  }

  getSeparatedStatistics() {
    return this.http.get<SeparatedErrors>(`${BASE_URL}?separate=true`).pipe(
      map(errors => {
        const errArray: Errors[] = [];
        const keys = Object.keys(errors);
        keys.forEach(key => {
          errArray.push({
            label: key,
            ...errors[key]
          });
        });
        return errArray;
      })
    );
  }

  getFileStatistic(fileName: string) {
    return this.http.get<Errors>(`${BASE_URL}/${fileName}`).pipe(
      map(errors => {
        const newErrors: Errors = {
          label: fileName,
          ...errors
        };
        return [newErrors];
      })
    );
  }
}
