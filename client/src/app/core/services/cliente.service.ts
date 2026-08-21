import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private http = inject(HttpClient);
  private apiUrl = '/api';

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('auth_token') ?? ''}` });
  }

  getAll(filters?: { email?: string; documento?: string }): Observable<any[]> {
    let params = new HttpParams();
    if (filters?.email) params = params.set('email', filters.email);
    if (filters?.documento) params = params.set('documento', filters.documento);
    return this.http.get<any[]>(`${this.apiUrl}/duenos`, { headers: this.headers(), params });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/duenos/${id}`, { headers: this.headers() });
  }

  create(data: { email: string; documentoIdentificacion: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/duenos`, data, { headers: this.headers() });
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/duenos/${id}`, data, { headers: this.headers() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/duenos/${id}`, { headers: this.headers() });
  }
}
