import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../shared/user";

const AUTH_URL =  'http://localhost:8080/auth'
const HTTP_OPTIONS : Object = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  responseType: 'text'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signin(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${AUTH_URL}/sign-in`, {
        email,
        password
      }, HTTP_OPTIONS);
  }

  signup(user: User): Observable<any> {
    return this.http.post(`${AUTH_URL}/sign-up`, user,
      {responseType: 'text'}
    );
  }
}
