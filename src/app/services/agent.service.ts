import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {retry} from "rxjs/operators";
import {Agent} from "../shared/agent";
const BASE_URL = 'http://localhost:8080/api'
@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${BASE_URL}/agent`)
      .pipe(
        retry(3),
      );
  }

  getSingle(id: string): Observable<Agent> {
    return this.http.get<Agent>(
      `${BASE_URL}/agent/${id}`)
      .pipe(
        retry(3),
      );
  }

  create(agent: Agent): Observable<any> {
    return this.http.post(`${BASE_URL}/agent/create`, agent,
      { responseType: 'text'}
    );
  }

  update(agent: Agent): Observable<any> {
    return this.http.put(
      `${BASE_URL}/agent/edit/${agent.id}`,
      agent,
      { responseType: 'text' }
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(
      `${BASE_URL}/agent/${id}`,
      { responseType: 'text' }
    );
  }
}
