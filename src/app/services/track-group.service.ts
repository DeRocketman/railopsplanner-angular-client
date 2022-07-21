import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {retry} from "rxjs/operators";
import {TrackGroup} from "../shared/track-group";

const BASE_URL = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class TrackGroupService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TrackGroup[]> {
    return this.http.get<TrackGroup[]>(`${BASE_URL}/track-group`)
      .pipe(
        retry(3),
      );
  }

  getSingle(id: string): Observable<TrackGroup> {
    return this.http.get<TrackGroup>(
      `${BASE_URL}/track-group/${id}`)
      .pipe(
        retry(3),
      );
  }

  create(trackGroup: TrackGroup): Observable<any> {
    return this.http.post(`${BASE_URL}/track-group/create`, trackGroup,
      { responseType: 'text'}
    );
  }

  update(trackGroup: TrackGroup): Observable<any> {
    return this.http.put(
      `${BASE_URL}/track-group/edit/${trackGroup.id}`,
      trackGroup,
      { responseType: 'text' }
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${BASE_URL}/track-group/${id}`,
      { responseType: 'text' }
    );
  }
}
