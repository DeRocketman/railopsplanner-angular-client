import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError, map, Observable, retry, catchError} from "rxjs";
import {TimeTableYear} from "../shared/time-table-year";
import {TimeTableYearRaw} from "../shared/time-table-year-raw";
import {TimeTableYearFactory} from "../shared/time-table-year-factory";

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
        map(timeTableYearRaw =>
          timeTableYearRaw.map(tty => TimeTableYearFactory.fromRaw(tty)),
        ),
        catchError(this.errorHandler)
      )
  }

  getSingle(id: number): Observable<TimeTableYear> {
    return this.http.get<TimeTableYearRaw>(
      `${baseUrl}/time-table-year/${id}`
    ).pipe(
      retry(3),
      map(tty => TimeTableYearFactory.fromRaw(tty)),
      catchError(this.errorHandler)
    );
  }

  create(tty: TimeTableYear): Observable<any> {
    return this.http.post(`${baseUrl}/time-table-year`, tty,
      { responseType: 'text'}
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  update(tty: TimeTableYear): Observable<any> {
    return this.http.put(
      `${baseUrl}/time-table-year/${tty.id}`,
      tty,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${baseUrl}/time-table-year/${id}`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error('Fehler aufgetreten!');
    return throwError(error);
  }
}
