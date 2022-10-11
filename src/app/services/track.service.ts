import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {retry} from "rxjs/operators";
import {Track} from "../shared/track";


const BASE_URL = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Track[]> {
    return this.http.get<Track[]>(`${BASE_URL}/track`)
      .pipe(
        retry(3),
      );
  }

  getSingle(id: string): Observable<Track> {
    return this.http.get<Track>(
      `${BASE_URL}/track/${id}`)
      .pipe(
        retry(3),
      );
  }

  create(track: Track): Observable<any> {
    return this.http.post(`${BASE_URL}/track/create`, track,
      { responseType: 'text'}
    );
  }

  update(track: Track): Observable<any> {
    return this.http.put(
      `${BASE_URL}/track/edit/${track.id}`,
      track
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${BASE_URL}/track/${id}`
    );
  }
}
