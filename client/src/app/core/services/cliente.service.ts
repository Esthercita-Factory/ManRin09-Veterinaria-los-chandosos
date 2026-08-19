import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api';

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('auth_token') ?? ''}` });
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/duenos`, { headers: this.headers() });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/duenos/${id}`, { headers: this.headers() });
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/registro/dueno`, data, { headers: this.headers() });
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/duenos/${id}`, data, { headers: this.headers() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/duenos/${id}`, { headers: this.headers() });
  }
}
