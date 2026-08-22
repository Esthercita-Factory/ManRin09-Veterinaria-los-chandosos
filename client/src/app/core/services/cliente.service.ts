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

  // ── BÚSQUEDA: HTTP GET con query params ──────────────────────────────────
  buscar(email: string, documento: string): Observable<any[]> {
    let params = new HttpParams();
    if (email.trim())     params = params.set('email',     email.trim());
    if (documento.trim()) params = params.set('documento', documento.trim());
    return this.http.get<any[]>(`${this.apiUrl}/duenos`, { headers: this.headers(), params });
  }

  // ── MIS CLIENTES (Veterinario) ─────────────────────────────────
  obtenerMisClientes(veterinarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/veterinarios/${veterinarioId}/clientes`, { headers: this.headers() });
  }

  // ── ASOCIAR / DESASOCIAR A VETERINARIA ─────────────────────────────────
  asociar(veterinarioId: number, duenoId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/veterinarios/${veterinarioId}/asociar-cliente/${duenoId}`, {}, { headers: this.headers() });
  }

  desasociar(veterinarioId: number, duenoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/veterinarios/${veterinarioId}/asociar-cliente/${duenoId}`, { headers: this.headers() });
  }

  // ── LECTURA GENÉRICA ─────────────────────────────────
  getAll(filters?: { email?: string; documento?: string }): Observable<any[]> {
    let params = new HttpParams();
    if (filters?.email)     params = params.set('email',     filters.email);
    if (filters?.documento) params = params.set('documento', filters.documento);
    return this.http.get<any[]>(`${this.apiUrl}/duenos`, { headers: this.headers(), params });
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/duenos/${id}`, { headers: this.headers() });
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/duenos/${id}`, data, { headers: this.headers() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/duenos/${id}`, { headers: this.headers() });
  }
}
