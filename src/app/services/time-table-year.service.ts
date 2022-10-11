import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map, retry} from "rxjs/operators";
import {TimeTableYear} from "../shared/time-table-year";
import {TimeTableYearRaw} from "../shared/time-table-year-raw";
import {TimeTableYearFactory} from "../shared/time-table-year-factory";
import {Observable} from "rxjs";

const BASE_URL = 'http://localhost:8080/api'
@Injectable({
  providedIn: 'root'
})
export class TimeTableYearService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TimeTableYear[]> {
    return this.http.get<TimeTableYearRaw[]>(`${BASE_URL}/time-table-year`)
      .pipe(
        retry(3),
        map(ttyRaw => ttyRaw.map(tty => TimeTableYearFactory.fromRaw(tty))),
      );
  }

  getSingle(id: string): Observable<TimeTableYear> {
    return this.http.get<TimeTableYearRaw>(
      `${BASE_URL}/time-table-year/${id}`)
      .pipe(
        retry(3),
        map(tty => TimeTableYearFactory.fromRaw(tty))
    );
  }

  create(tty: TimeTableYear): Observable<any> {
    return this.http.post(`${BASE_URL}/time-table-year/create`, tty,
    );
  }

  update(tty: TimeTableYear): Observable<any> {
    return this.http.put(
      `${BASE_URL}/time-table-year/edit/${tty.id}`, tty,
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${BASE_URL}/time-table-year/delete/${id}`,
    );
  }

  deleteAll(): Observable<any> {
    return this.http.delete(BASE_URL);
  }
}
