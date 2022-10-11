import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlanningPeriod} from "../shared/planning-period";
import {retry} from "rxjs/operators";
const BASE_URL = 'http://localhost:8080/api'
@Injectable({
  providedIn: 'root'
})
export class PlanningPeriodService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<PlanningPeriod[]> {
    return this.http.get<PlanningPeriod[]>(`${BASE_URL}/planning-period`)
      .pipe(
        retry(3),
      );
  }

  getSingle(id: string): Observable<PlanningPeriod> {
    return this.http.get<PlanningPeriod>(
      `${BASE_URL}/planning-period/${id}`)
      .pipe(
        retry(3),
      );
  }

  create(pp: PlanningPeriod): Observable<any> {
    return this.http.post(`${BASE_URL}/planning-period/create`, pp,
      { responseType: 'text'}
    );
  }

  update(pp: PlanningPeriod): Observable<any> {
    return this.http.put(
      `${BASE_URL}/planning-period/edit/${pp.id}`,
      pp,
      { responseType: 'text' }
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${BASE_URL}/planning-period/delete/${id}`,
      { responseType: 'text' }
    );
  }
}
