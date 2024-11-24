import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<string> {

  return this.http.post<{ message: string; data: string }>(`${this.apiUrl}/auth/login`, credentials).pipe(
    tap(response => {
      console.log('Respuesta del servidor:', response);
      const token = response.data;
      if (token) {
        localStorage.setItem('authToken', token);

      } else {
        console.error('No se recibió un token válido');
      }
    }),
    map((response: { data: any; }) => response.data)
  );
}




  logout() {
    localStorage.removeItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}