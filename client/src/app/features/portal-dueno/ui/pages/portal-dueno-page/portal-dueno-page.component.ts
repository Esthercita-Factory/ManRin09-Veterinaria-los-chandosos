import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth.service';
import { MascotaService } from '../../../../../core/services/mascota.service';
import { CitaService } from '../../../../../core/services/cita.service';
import { ClienteService } from '../../../../../core/services/cliente.service';

@Component({
  selector: 'app-portal-dueno-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-[#FBFBFA] flex font-sans text-gray-800">

      <!-- Left Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-6 shrink-0 hidden md:flex">
        <div>
          <!-- Logo & Brand -->
          <div class="flex flex-col items-center text-center mb-8">
            <div class="w-14 h-14 rounded-full bg-[#89A88C]/15 flex items-center justify-center mb-2 text-[#7F9F80]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 fill-current" viewBox="0 0 24 24">
                <path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-2.5 4c-.8 0-1.5.7-1.5 1.5S4.7 11 5.5 11 7 10.3 7 9.5 6.3 8 5.5 8zm13 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5S20 10.3 20 9.5 19.3 8 18.5 8zM12 11c-2.8 0-5 2.2-5 5v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-1c0-2.8-2.2-5-5-5z"/>
              </svg>
            </div>
            <h2 class="font-bold text-lg text-gray-900 leading-snug">Veterinaria los chandosos</h2>
            <p class="text-xs text-gray-500 font-medium">Cuidado compasivo</p>
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-1.5">
            <button (click)="activeTab='mascotas'" [class]="activeTab==='mascotas' ? 'flex items-center gap-3.5 px-4 py-3 rounded-2xl font-medium text-white bg-[#7F9F80] shadow-sm w-full text-left' : 'flex items-center gap-3.5 px-4 py-3 rounded-2xl font-medium text-gray-600 hover:bg-gray-50 w-full text-left transition'">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-2.5 4c-.8 0-1.5.7-1.5 1.5S4.7 11 5.5 11 7 10.3 7 9.5 6.3 8 5.5 8zm13 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5S20 10.3 20 9.5 19.3 8 18.5 8zM12 11c-2.8 0-5 2.2-5 5v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-1c0-2.8-2.2-5-5-5z"/></svg>
              <span>Mis Mascotas</span>
            </button>
            <button (click)="activeTab='citas'" [class]="activeTab==='citas' ? 'flex items-center gap-3.5 px-4 py-3 rounded-2xl font-medium text-white bg-[#7F9F80] shadow-sm w-full text-left' : 'flex items-center gap-3.5 px-4 py-3 rounded-2xl font-medium text-gray-600 hover:bg-gray-50 w-full text-left transition'">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span>Mis Citas</span>
            </button>
            <button (click)="activeTab='historial'" [class]="activeTab==='historial' ? 'flex items-center gap-3.5 px-4 py-3 rounded-2xl font-medium text-white bg-[#7F9F80] shadow-sm w-full text-left' : 'flex items-center gap-3.5 px-4 py-3 rounded-2xl font-medium text-gray-600 hover:bg-gray-50 w-full text-left transition'">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
              <span>Historial Médico</span>
            </button>
          </nav>
        </div>

        <div>
          <!-- Disabled Agendar Cita -->
          <div class="mb-3 group relative">
            <button disabled class="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 cursor-not-allowed">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span>Agendar Cita</span>
            </button>
            <div class="absolute bottom-full left-0 right-0 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg px-3 py-2 text-center">
              Solo el veterinario puede agendar citas
            </div>
          </div>
          <!-- Logout -->
          <button (click)="logout()" class="w-full flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 flex flex-col overflow-y-auto">
        <!-- Top Greeting Bar -->
        <header class="px-8 pt-8 pb-6 flex items-start justify-between border-b border-gray-100 bg-[#FBFBFA]">
          <div>
            <h1 class="text-4xl font-extrabold text-[#243629] tracking-tight">¡Hola, {{ userNombre || 'Dueño' }}!</h1>
            <p class="text-gray-500 text-sm mt-1">Tus mascotas están en buenas manos.</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-11 h-11 rounded-full bg-[#89A88C]/20 flex items-center justify-center font-bold text-[#3B5A45] text-lg cursor-pointer hover:opacity-80 transition border-2 border-white shadow-sm" (click)="showProfileModal=true">
              {{ userNombre ? userNombre[0].toUpperCase() : 'D' }}
            </div>
          </div>
        </header>

        <!-- Body -->
        <div class="p-8">

          <!-- ===== TAB: MIS MASCOTAS ===== -->
          @if (activeTab === 'mascotas') {
            <h2 class="text-xl font-bold text-gray-900 mb-5">Mis Mascotas</h2>
            @if (loadingMascotas) { <p class="text-gray-400 text-sm">Cargando mascotas...</p> }
            @if (errorMascotas) { <div class="bg-red-50 text-red-600 rounded-lg px-4 py-3 text-sm mb-4">{{ errorMascotas }}</div> }
            @if (!loadingMascotas) {
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                @for (m of mascotas; track m.id) {
                  <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <div class="flex items-center gap-3 mb-3">
                      <div class="w-12 h-12 rounded-full bg-[#89A88C]/20 flex items-center justify-center text-[#3B5A45] font-bold text-xl">
                        {{ m.nombre ? m.nombre[0].toUpperCase() : '?' }}
                      </div>
                      <div>
                        <h3 class="font-bold text-gray-900">{{ m.nombre }}</h3>
                        <p class="text-xs text-gray-500">{{ m.especie }} • {{ m.raza }}</p>
                      </div>
                    </div>
                    <div class="pt-3 border-t border-gray-100 text-xs text-gray-600">
                      <p class="font-semibold text-gray-700 mb-1">Historial:</p>
                      <p class="line-clamp-2">{{ m.historialMedico || 'Sin historial registrado.' }}</p>
                      @if (m.historialMedico) {
                        <button (click)="viewHistorial(m)" class="mt-2 text-[#7F9F80] font-semibold hover:underline">Ver completo →</button>
                      }
                    </div>
                  </div>
                }
                @if (mascotas.length === 0) {
                  <div class="col-span-3 py-12 text-center text-gray-400">
                    <p class="text-5xl mb-3">🐾</p>
                    <p>No tienes mascotas registradas todavía.</p>
                  </div>
                }
              </div>
            }
          }

          <!-- ===== TAB: MIS CITAS ===== -->
          @if (activeTab === 'citas') {
            <h2 class="text-xl font-bold text-gray-900 mb-5">Mis Citas</h2>
            @if (loadingCitas) { <p class="text-gray-400 text-sm">Cargando citas...</p> }
            @if (errorCitas) { <div class="bg-red-50 text-red-600 rounded-lg px-4 py-3 text-sm mb-4">{{ errorCitas }}</div> }
            @if (!loadingCitas) {
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead><tr class="bg-gray-100/70 text-gray-700 font-semibold text-xs">
                    <th class="py-3 px-4 rounded-tl-2xl">Mascota</th>
                    <th class="py-3 px-4">Fecha/Hora</th>
                    <th class="py-3 px-4">Motivo</th>
                    <th class="py-3 px-4 rounded-tr-2xl">Estado</th>
                  </tr></thead>
                  <tbody class="divide-y divide-gray-100">
                    @for (c of citas; track c.id) {
                      <tr class="hover:bg-gray-50 transition">
                        <td class="py-3 px-4 font-semibold">{{ getMascotaNombre(c.mascotaId) }}</td>
                        <td class="py-3 px-4">{{ c.fechaHora | date:'dd/MM/yyyy HH:mm' }}</td>
                        <td class="py-3 px-4">{{ c.motivo }}</td>
                        <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full text-xs font-semibold" [class]="estadoClass(c.estado)">{{ c.estado }}</span></td>
                      </tr>
                    }
                    @if (citas.length === 0) {
                      <tr><td colspan="4" class="py-8 text-center text-gray-400">No tienes citas programadas.</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          }

          <!-- ===== TAB: HISTORIAL MÉDICO ===== -->
          @if (activeTab === 'historial') {
            <h2 class="text-xl font-bold text-gray-900 mb-5">Historial Médico</h2>
            @if (loadingMascotas) { <p class="text-gray-400 text-sm">Cargando...</p> }
            @if (!loadingMascotas) {
              <div class="space-y-4">
                @for (m of mascotas; track m.id) {
                  <div class="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div class="flex items-center gap-3 mb-4">
                      <div class="w-10 h-10 rounded-full bg-[#89A88C]/20 flex items-center justify-center text-[#3B5A45] font-bold">
                        {{ m.nombre ? m.nombre[0].toUpperCase() : '?' }}
                      </div>
                      <div>
                        <h3 class="font-bold text-gray-900">{{ m.nombre }}</h3>
                        <p class="text-xs text-gray-500">{{ m.especie }} • {{ m.raza }}</p>
                      </div>
                    </div>
                    <div class="bg-[#F0F5F1] rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {{ m.historialMedico || 'Sin historial médico registrado por el veterinario.' }}
                    </div>
                  </div>
                }
                @if (mascotas.length === 0) {
                  <p class="text-gray-400 text-center py-12">No hay mascotas registradas.</p>
                }
              </div>
            }
          }
        </div>
      </div>

      <!-- ===== MODAL: PERFIL ===== -->
      @if (showProfileModal) {
        <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center overflow-y-auto" (click)="showProfileModal=false">
          <div class="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl m-4" (click)="$event.stopPropagation()">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-full bg-[#89A88C]/20 flex items-center justify-center text-2xl font-bold text-[#3B5A45]">
                {{ userNombre ? userNombre[0].toUpperCase() : 'D' }}
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-lg">{{ userNombre }}</h3>
                <span class="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full mt-1 inline-block">Dueño</span>
              </div>
            </div>

            <div class="space-y-3 mb-6">
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Nombre</label>
                <input [(ngModel)]="perfilForm.nombre" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                <input [(ngModel)]="perfilForm.email" type="email" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]" disabled title="El email no puede cambiarse">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Teléfono</label>
                <input [(ngModel)]="perfilForm.telefono" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]">
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <button (click)="guardarPerfil()" class="w-full bg-[#89A88C] hover:bg-[#7F9F80] text-white font-semibold py-2.5 rounded-xl text-sm transition">
                {{ savingPerfil ? 'Guardando...' : 'Guardar Cambios' }}
              </button>
              <button (click)="logout()" class="w-full border border-red-200 text-red-500 hover:bg-red-50 font-semibold py-2.5 rounded-xl text-sm transition mt-2">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      }

      <!-- ===== MODAL: HISTORIAL COMPLETO ===== -->
      @if (showHistorialModal && selectedMascota) {
        <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" (click)="showHistorialModal=false">
          <div class="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl" (click)="$event.stopPropagation()">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-gray-900">Historial — {{ selectedMascota.nombre }}</h2>
              <button (click)="showHistorialModal=false" class="text-gray-400 hover:text-gray-600 p-1">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div class="bg-[#F0F5F1] rounded-xl p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
              {{ selectedMascota.historialMedico }}
            </div>
          </div>
        </div>
      }
    </div>
  `
})
export class PortalDuenoPageComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private mascotaService: MascotaService,
    private citaService: CitaService,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  activeTab = 'mascotas';
  userNombre = localStorage.getItem('user_nombre') || '';
  userEmail = localStorage.getItem('user_email') || '';
  userId = parseInt(localStorage.getItem('user_id') || '0');

  perfilForm = { nombre: this.userNombre, email: this.userEmail, telefono: '' };
  savingPerfil = false;

  mascotas: any[] = [];
  citas: any[] = [];

  loadingMascotas = false;
  loadingCitas = false;
  errorMascotas = '';
  errorCitas = '';

  showProfileModal = false;
  showHistorialModal = false;
  selectedMascota: any = null;

  // Data loading initialized later

  loadMascotas() {
    this.loadingMascotas = true;
    this.errorMascotas = '';
    const obs = this.userId
      ? this.mascotaService.getByDueno(this.userId)
      : this.mascotaService.getAll();
    obs.subscribe({
      next: (data: any[]) => { this.mascotas = data; this.loadingMascotas = false; },
      error: (_e: any) => { this.errorMascotas = 'Error al cargar mascotas.'; this.loadingMascotas = false; }
    });
  }

  loadCitas() {
    this.loadingCitas = true;
    this.errorCitas = '';
    this.citaService.getAll().subscribe({
      next: (data: any[]) => {
        const myMascotaIds = new Set(this.mascotas.map((m: any) => m.id));
        this.citas = this.mascotas.length > 0 ? data.filter((c: any) => myMascotaIds.has(c.mascotaId)) : data;
        this.loadingCitas = false;
      },
      error: (_e: any) => { this.errorCitas = 'Error al cargar citas.'; this.loadingCitas = false; }
    });
  }

  getMascotaNombre(mascotaId: number): string {
    return this.mascotas.find((m: any) => m.id === mascotaId)?.nombre || `Mascota #${mascotaId}`;
  }

  viewHistorial(m: any) {
    this.selectedMascota = m;
    this.showHistorialModal = true;
  }

  estadoClass(estado: string): string {
    switch (estado) {
      case 'Confirmada': return 'bg-emerald-100 text-emerald-700';
      case 'Pendiente': return 'bg-amber-100 text-amber-700';
      case 'Cancelada': return 'bg-red-100 text-red-600';
      case 'Completada': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  ngOnInit() {
    this.loadPerfil();
    this.loadMascotas();
    this.loadCitas();
  }

  loadPerfil() {
    if (!this.userId) return;
    this.clienteService.getById(this.userId).subscribe({
      next: (data) => {
        if (data) {
          this.perfilForm.nombre = data.nombre;
          this.perfilForm.telefono = data.telefono;
          this.userNombre = data.nombre;
        }
      }
    });
  }

  guardarPerfil() {
    if (!this.userId) return;
    this.savingPerfil = true;
    this.clienteService.update(this.userId, this.perfilForm).subscribe({
      next: () => {
        this.savingPerfil = false;
        this.userNombre = this.perfilForm.nombre;
        localStorage.setItem('user_nombre', this.perfilForm.nombre);
        this.showProfileModal = false;
      },
      error: () => this.savingPerfil = false
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
