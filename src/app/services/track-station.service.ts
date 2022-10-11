import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Station} from "../shared/station";
import {retry} from "rxjs/operators";
import {TrackStation} from "../shared/track-station";

const BASE_URL = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class TrackStationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TrackStation[]> {
    return this.http.get<TrackStation[]>(`${BASE_URL}/track-station`)
      .pipe(
        retry(3),
      );
  }

  getSingle(id: string): Observable<TrackStation> {
    return this.http.get<TrackStation>(
      `${BASE_URL}/track-station/${id}`)
      .pipe(
        retry(3),
      );
  }

  create(trackStation: TrackStation): Observable<any> {
    return this.http.post(`${BASE_URL}/track-station/create`, trackStation,
      { responseType: 'json'}
    );
  }

  update(trackStation: Station): Observable<any> {
    return this.http.put(
      `${BASE_URL}/track-station/edit/${trackStation.id}`,
      trackStation,
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${BASE_URL}/track-station/${id}`,
    );
  }
}

