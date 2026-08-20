import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VeterinarioService {
  private http = inject(HttpClient);
  private apiUrl = '/api';

  private headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('auth_token') ?? ''}` });
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/veterinarios/${id}`, data, { headers: this.headers() });
  }
}
