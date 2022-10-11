import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {retry} from "rxjs/operators";
import {RailNetwork} from "../shared/rail-network";
const BASE_URL = 'http://localhost:8080/api'
@Injectable({
  providedIn: 'root'
})
export class RailNetworkService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<RailNetwork[]> {
    return this.http.get<RailNetwork[]>(`${BASE_URL}/rail-network`)
      .pipe(
        retry(3),
      );
  }

  getSingle(id: string): Observable<RailNetwork> {
    return this.http.get<RailNetwork>(
      `${BASE_URL}/rail-network/${id}`)
      .pipe(
        retry(3),
      );
  }

  create(rn: RailNetwork): Observable<any> {
    return this.http.post(`${BASE_URL}/rail-network/create`, rn,
      { responseType: 'text'}
    );
  }

  update(rn: RailNetwork): Observable<any> {
    return this.http.put(
      `${BASE_URL}/rail-network/edit/${rn.id}`,
      rn,
      { responseType: 'text' }
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${BASE_URL}/rail-network/delete/${id}`,
      { responseType: 'text' }
    );
  }
}
