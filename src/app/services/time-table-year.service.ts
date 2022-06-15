import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { map, retry, catchError} from "rxjs/operators";
import {TimeTableYear} from "../shared/time-table-year";
import {TimeTableYearRaw} from "../shared/time-table-year-raw";
import {TimeTableYearFactory} from "../shared/time-table-year-factory";
import {Observable, throwError} from "rxjs";

const baseUrl = 'http://localhost:8080/api'
@Injectable({
  providedIn: 'root'
})
export class TimeTableYearService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TimeTableYear[]> {
    return this.http.get<TimeTableYearRaw[]>(`${baseUrl}/time-table-year`)
      .pipe(
        retry(3),
        map(ttyRaw => ttyRaw.map(tty => TimeTableYearFactory.fromRaw(tty))),
      );
  }

  getSingle(id: string): Observable<TimeTableYear> {
    return this.http.get<TimeTableYearRaw>(
      `${baseUrl}/time-table-year/${id}`)
      .pipe(
        retry(3),
        map(tty => TimeTableYearFactory.fromRaw(tty))
    );
  }

  create(tty: TimeTableYear): Observable<any> {
    return this.http.post(`${baseUrl}/time-table-year`, tty,
      { responseType: 'text'}
    );
  }

  update(tty: TimeTableYear): Observable<any> {
    return this.http.put(
      `${baseUrl}/time-table-year/${tty.id}`,
      tty,
      { responseType: 'text' }
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${baseUrl}/time-table-year/${id}`,
      { responseType: 'text' }
    );
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

}
