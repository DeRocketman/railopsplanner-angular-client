import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {retry} from "rxjs/operators";
import {Measure} from "../shared/measure";
const BASE_URL = 'http://localhost:8080/api'
@Injectable({
  providedIn: 'root'
})
export class MeasureService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Measure[]> {
    return this.http.get<Measure[]>(`${BASE_URL}/measure`)
      .pipe(
        retry(3),
      );
  }

  getSingle(id: string): Observable<Measure> {
    return this.http.get<Measure>(
      `${BASE_URL}/measure/${id}`)
      .pipe(
        retry(3),
      );
  }

  create(measure: Measure): Observable<any> {
    return this.http.post(`${BASE_URL}/measure/create`, measure,
      { responseType: 'text'}
    );
  }

  update(measure: Measure): Observable<any> {
    return this.http.put(
      `${BASE_URL}/measure/edit/${measure.id}`,
      measure,
      { responseType: 'text' }
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${BASE_URL}/measure/${id}`,
      { responseType: 'text' }
    );
  }
}
