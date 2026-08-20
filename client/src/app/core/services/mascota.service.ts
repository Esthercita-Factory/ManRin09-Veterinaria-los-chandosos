import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MascotaService {
  private http = inject(HttpClient);
  private apiUrl = '/api/mascotas';

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('auth_token') ?? ''}` });
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers() });
  }

  getByDueno(duenoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dueno/${duenoId}`, { headers: this.headers() });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers() });
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, { headers: this.headers() });
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, { headers: this.headers() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.headers() });
  }
}
