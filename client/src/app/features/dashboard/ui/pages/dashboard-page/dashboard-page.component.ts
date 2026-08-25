import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { AuthService } from '../../../../../core/services/auth.service';
import { ClienteService } from '../../../../../core/services/cliente.service';
import { MascotaService } from '../../../../../core/services/mascota.service';
import { CitaService } from '../../../../../core/services/cita.service';
import { VeterinarioService } from '../../../../../core/services/veterinario.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="min-h-screen bg-[#F0F5F1] flex flex-col font-sans text-gray-800">

      <!-- Top Navigation Bar -->
      <header class="bg-[#89A88C] text-white px-6 py-3 flex items-center justify-between shadow-sm">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 10.5h-4.5V6a1.5 1.5 0 00-3 0v4.5H7a1.5 1.5 0 000 3h4.5V18a1.5 1.5 0 003 0v-4.5H19a1.5 1.5 0 000-3z"/>
            </svg>
          </div>
          <span class="text-xl font-bold tracking-wide">Veterinaria Los Chandosos</span>
        </div>
        <div class="flex items-center gap-6">
          <div class="relative hidden md:block">
            <input type="text" placeholder="Buscar..." class="bg-[#E4ECE5] text-gray-800 placeholder-gray-500 text-sm rounded-full pl-9 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-white/50 w-44 lg:w-56" />
            <svg class="w-4 h-4 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <!-- User Profile -->
          <div class="flex items-center gap-3 cursor-pointer hover:opacity-90" (click)="showProfileModal = true">
            <div class="w-9 h-9 rounded-full bg-white/30 flex items-center justify-center font-bold text-lg border border-white/40">
              {{ userNombre ? userNombre[0].toUpperCase() : 'V' }}
            </div>
            <div class="text-left leading-tight hidden sm:block">
              <p class="text-sm font-semibold">{{ userNombre || 'Veterinario' }}</p>
              <p class="text-xs text-white/80">{{ userEmail || '' }}</p>
            </div>
            <svg class="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
      </header>

      <div class="flex flex-1">
        <!-- Sidebar -->
        <aside class="w-64 bg-white border-r border-gray-200 flex flex-col p-4 shrink-0 shadow-sm hidden md:flex">
          <div class="bg-[#89A88C]/15 text-[#5D7A60] font-bold text-xs uppercase px-3 py-2 rounded-lg mb-4 text-center tracking-wider">
            Los Chandosos Admin
          </div>
          <nav class="space-y-1.5 flex-1">
            <button (click)="activeTab='dashboard'" [class]="activeTab==='dashboard' ? 'flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-white bg-[#89A88C] shadow-sm w-full text-left' : 'flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 w-full text-left transition'">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              <span>Dashboard</span>
            </button>
            <button (click)="activeTab='clientes'" [class]="activeTab==='clientes' ? 'flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-white bg-[#89A88C] shadow-sm w-full text-left' : 'flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 w-full text-left transition'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>Clientes</span>
            </button>
            <button (click)="activeTab='mascotas'; loadMascotas()" [class]="activeTab==='mascotas' ? 'flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-white bg-[#89A88C] shadow-sm w-full text-left' : 'flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 w-full text-left transition'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              <span>Mascotas</span>
            </button>
            <button (click)="activeTab='citas'; loadCitas()" [class]="activeTab==='citas' ? 'flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-white bg-[#89A88C] shadow-sm w-full text-left' : 'flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 w-full text-left transition'">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span>Citas</span>
            </button>
          </nav>
          <div class="pt-4 border-t border-gray-100">
            <button (click)="logout()" class="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition w-full">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-6 md:p-8 overflow-y-auto">

          <!-- ===== TAB: DASHBOARD ===== -->
          @if (activeTab === 'dashboard') {
            <div class="mb-6">
              <h1 class="text-3xl font-extrabold text-[#233124] tracking-tight uppercase">PANEL GENERAL</h1>
              <p class="text-gray-600 text-sm font-medium mt-0.5">Bienvenido, {{ userNombre || 'Veterinario' }}</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div class="bg-[#89A88C] text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <p class="text-xs font-bold uppercase tracking-wider text-white/90">Total Clientes</p>
                <p class="text-5xl font-extrabold mt-3">{{ clientes.length }}</p>
                <div class="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full blur-xl"></div>
              </div>
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p class="text-xs font-bold uppercase tracking-wider text-gray-700">Total Mascotas</p>
                <p class="text-5xl font-extrabold text-gray-900 mt-3">{{ mascotas.length }}</p>
              </div>
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <p class="text-xs font-bold uppercase tracking-wider text-gray-700">Total Citas</p>
                <p class="text-5xl font-extrabold text-gray-900 mt-3">{{ citas.length }}</p>
              </div>
            </div>
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 class="text-xl font-bold text-gray-900 mb-4">Próximas Citas</h2>
              @if (loadingCitas) { <p class="text-gray-400 text-sm">Cargando...</p> }
              @if (!loadingCitas && citas.length === 0) { <p class="text-gray-400 text-sm">No hay citas registradas.</p> }
              @if (!loadingCitas && citas.length > 0) {
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-sm">
                    <thead><tr class="bg-gray-100/70 text-gray-700 font-semibold text-xs">
                      <th class="py-2.5 px-4 rounded-l-lg">Mascota</th>
                      <th class="py-2.5 px-4">Fecha/Hora</th>
                      <th class="py-2.5 px-4">Motivo</th>
                      <th class="py-2.5 px-4 rounded-r-lg">Estado</th>
                    </tr></thead>
                    <tbody class="divide-y divide-gray-100">
                      @for (c of citas.slice(0,5); track c.id) {
                        <tr class="hover:bg-gray-50 transition">
                          <td class="py-3 px-4 font-semibold text-gray-700">{{ getMascotaNombre(c.mascotaId) }}</td>
                          <td class="py-3 px-4">{{ c.fechaHora | date:'dd/MM/yyyy hh:mm a' }}</td>
                          <td class="py-3 px-4">{{ c.motivo }}</td>
                          <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full text-xs font-semibold" [class]="estadoClass(c.estado)">{{ c.estado }}</span></td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              }
            </div>
          }

          <!-- ===== TAB: CLIENTES ===== -->
          @if (activeTab === 'clientes') {
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-3xl font-extrabold text-[#233124] tracking-tight">Clientes</h1>
              
            </div>

            <!-- Barra de búsqueda por filtros -->
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
              <div class="flex flex-col sm:flex-row gap-3 items-end">
                <div class="flex-1">
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Correo Electrónico</label>
                  <input [(ngModel)]="searchEmail" type="email" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]" placeholder="Buscar por email..." (keyup.enter)="buscarCliente()" />
                </div>
                <div class="flex-1">
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Nº Identificación</label>
                  <input [(ngModel)]="searchDocumento" type="text" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]" placeholder="Buscar por documento..." (keyup.enter)="buscarCliente()" />
                </div>
                <div class="flex gap-2 shrink-0">
                  <!-- Botón Buscar: llama SOLO a buscarCliente() → GET /api/duenos -->
                  <button (click)="buscarCliente()" type="button" class="bg-[#89A88C] hover:bg-[#77957A] text-white font-semibold px-4 py-2 rounded-lg text-sm transition shadow-sm flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    Buscar
                  </button>
                  @if (searchEmail || searchDocumento) {
                    <button (click)="clearSearch()" type="button" class="border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold px-4 py-2 rounded-lg text-sm transition flex items-center gap-1.5">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                      Limpiar
                    </button>
                  }
                </div>
              </div>
            </div>

            
            @if (errorClientes) { 
              <div class="bg-red-50 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">{{ errorClientes }}</div> 
            }

            @if (loadingClientes) { 
              <div class="flex flex-col items-center justify-center py-12">
                <div class="w-10 h-10 border-4 border-gray-200 border-t-[#89A88C] rounded-full animate-spin mb-3"></div>
                <p class="text-gray-500 font-medium">Buscando cliente...</p>
              </div>
            } @else if (!hasSearched) {
              <!-- Estado inicial: invitación a buscar -->
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 bg-[#89A88C]/10 rounded-full flex items-center justify-center mb-4">
                  <svg class="w-8 h-8 text-[#89A88C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">Busque un cliente para comenzar</h3>
                <p class="text-gray-500 text-sm max-w-sm">Ingrese el correo electrónico o número de identificación del cliente en la barra de búsqueda superior para localizar su expediente.</p>
              </div>
            } @else if (clientes.length === 0) {
              <!-- Sin resultados tras búsqueda -->
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
                <div class="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                  <svg class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1">No se encontró ningún cliente</h3>
                <p class="text-gray-500 text-sm mb-6 max-w-sm">No existe un cliente con los datos proporcionados. Verifique la información o registre un nuevo cliente.</p>
                
              </div>
            } @else {
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead><tr class="bg-gray-100/70 text-gray-700 font-semibold text-xs">
                    <th class="py-3 px-4 rounded-tl-2xl">ID</th>
                    <th class="py-3 px-4">Nombre</th>
                    <th class="py-3 px-4">Email</th>
                    <th class="py-3 px-4">Documento</th>
                    <th class="py-3 px-4">Teléfono</th>
                    <th class="py-3 px-4">Mascotas</th>
                    <th class="py-3 px-4 rounded-tr-2xl">Acciones</th>
                  </tr></thead>
                  <tbody class="divide-y divide-gray-100">
                    @for (c of clientes; track c.id) {
                      <tr class="hover:bg-gray-50 transition">
                        <td class="py-3 px-4 text-gray-500">{{ c.id }}</td>
                        <td class="py-3 px-4 font-semibold">{{ c.nombre }}</td>
                        <td class="py-3 px-4 text-gray-600">{{ c.email }}</td>
                        <td class="py-3 px-4 text-gray-600">{{ c.documentoIdentificacion || '—' }}</td>
                        <td class="py-3 px-4 text-gray-600">{{ c.telefono || '—' }}</td>
                        <td class="py-3 px-4">
                          <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-semibold">
                            {{ c.mascotas?.length || 0 }} asociadas
                          </span>
                        </td>
                        <td class="py-3 px-4 flex gap-2">
                          @if (!c.veterinarioIds?.includes(userId)) {
                            <!-- Botón Guardar (asociar) -->
                            <button (click)="asociarCliente(c.id)" class="text-blue-600 hover:text-blue-900 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition">Guardar</button>
                          } @else {
                            <!-- Botones si ya está asociado -->
                            <button (click)="openMascotaModal({ duenoId: c.id })" class="text-green-600 hover:text-green-900 font-medium bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md transition">+ Mascota</button>
                            <button (click)="eliminarCliente(c.id)" class="text-red-600 hover:text-red-900 font-medium bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition">Eliminar</button>
                          }
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          }

          <!-- ===== TAB: MASCOTAS ===== -->
          @if (activeTab === 'mascotas') {
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-3xl font-extrabold text-[#233124] tracking-tight">Mascotas</h1>
              <button (click)="openMascotaModal()" class="bg-[#89A88C] hover:bg-[#77957A] text-white font-semibold px-4 py-2 rounded-lg text-sm transition shadow-sm">+ Nueva Mascota</button>
            </div>
            @if (errorMascotas) { <div class="bg-red-50 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">{{ errorMascotas }}</div> }
            @if (loadingMascotas) { <p class="text-gray-400">Cargando mascotas...</p> }
            @if (!loadingMascotas) {
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead><tr class="bg-gray-100/70 text-gray-700 font-semibold text-xs">
                    <th class="py-3 px-4 rounded-tl-2xl">ID</th>
                    <th class="py-3 px-4">Nombre</th>
                    <th class="py-3 px-4">Especie</th>
                    <th class="py-3 px-4">Raza</th>
                    <th class="py-3 px-4">Dueño ID</th>
                    <th class="py-3 px-4">Historial</th>
                    <th class="py-3 px-4 rounded-tr-2xl">Acciones</th>
                  </tr></thead>
                  <tbody class="divide-y divide-gray-100">
                    @for (m of mascotas; track m.id) {
                      <tr class="hover:bg-gray-50 transition">
                        <td class="py-3 px-4 text-gray-500">{{ m.id }}</td>
                        <td class="py-3 px-4 font-semibold">{{ m.nombre }}</td>
                        <td class="py-3 px-4">{{ m.especie }}</td>
                        <td class="py-3 px-4 text-gray-600">{{ m.raza }}</td>
                        <td class="py-3 px-4 text-gray-600">{{ m.duenoId }}</td>
                        <td class="py-3 px-4 text-gray-500 max-w-xs truncate">{{ m.historialMedico || '—' }}</td>
                        <td class="py-3 px-4 flex gap-2">
                          <button (click)="openMascotaModal(m)" class="text-xs bg-[#89A88C]/15 text-[#3B5A45] font-semibold px-3 py-1.5 rounded-lg hover:bg-[#89A88C]/30 transition">Editar</button>
                          <button (click)="deleteMascota(m.id)" class="text-xs bg-red-50 text-red-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-100 transition">Eliminar</button>
                        </td>
                      </tr>
                    }
                    @if (mascotas.length === 0) {
                      <tr><td colspan="7" class="py-8 text-center text-gray-400">No hay mascotas registradas.</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          }

          <!-- ===== TAB: CITAS ===== -->
          @if (activeTab === 'citas') {
            <div class="flex items-center justify-between mb-6">
              <h1 class="text-3xl font-extrabold text-[#233124] tracking-tight">Citas</h1>
              <button (click)="openCitaModal()" class="bg-[#89A88C] hover:bg-[#77957A] text-white font-semibold px-4 py-2 rounded-lg text-sm transition shadow-sm">+ Nueva Cita</button>
            </div>
            
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
              <div class="flex flex-col sm:flex-row gap-3 items-end">
                <div class="flex-1">
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Fecha</label>
                  <input [(ngModel)]="searchCitaFecha" type="date" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]" />
                </div>
                <div class="flex-1">
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Mascota</label>
                  <input [(ngModel)]="searchCitaMascota" type="text" placeholder="Nombre de mascota..." class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]" />
                </div>
                <div class="flex gap-2 shrink-0">
                  <button (click)="searchCitaFecha=''; searchCitaMascota=''" type="button" class="border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold px-4 py-2 rounded-lg text-sm transition flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                    Limpiar
                  </button>
                </div>
              </div>
            </div>

            @if (errorCitas) { <div class="bg-red-50 text-red-600 rounded-lg px-4 py-3 mb-4 text-sm">{{ errorCitas }}</div> }
            @if (loadingCitas) { <p class="text-gray-400">Cargando citas...</p> }
            @if (!loadingCitas) {
              <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                <table class="w-full text-left text-sm">
                  <thead><tr class="bg-gray-100/70 text-gray-700 font-semibold text-xs">
                    <th class="py-3 px-4 rounded-tl-2xl">Mascota</th>
                    <th class="py-3 px-4">Fecha/Hora</th>
                    <th class="py-3 px-4">Motivo</th>
                    <th class="py-3 px-4">Estado</th>
                    <th class="py-3 px-4 rounded-tr-2xl">Acciones</th>
                  </tr></thead>
                  <tbody class="divide-y divide-gray-100">
                    @for (c of citasFiltradas; track c.id) {
                      <tr class="hover:bg-gray-50 transition">
                        <td class="py-3 px-4 font-semibold text-gray-700">{{ getMascotaNombre(c.mascotaId) }}</td>
                        <td class="py-3 px-4">{{ c.fechaHora | date:'dd/MM/yyyy hh:mm a' }}</td>
                        <td class="py-3 px-4">{{ c.motivo }}</td>
                        <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full text-xs font-semibold" [class]="estadoClass(c.estado)">{{ c.estado }}</span></td>
                        <td class="py-3 px-4 flex gap-2">
                          <button (click)="openCitaModal(c)" class="text-xs bg-[#89A88C]/15 text-[#3B5A45] font-semibold px-3 py-1.5 rounded-lg hover:bg-[#89A88C]/30 transition">Editar</button>
                          <button (click)="deleteCita(c.id)" class="text-xs bg-red-50 text-red-600 font-semibold px-3 py-1.5 rounded-lg hover:bg-red-100 transition">Eliminar</button>
                        </td>
                      </tr>
                    }
                    @if (citasFiltradas.length === 0) {
                      <tr><td colspan="5" class="py-8 text-center text-gray-400">No hay citas que coincidan con la búsqueda.</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          }
        </main>
      </div>

      <!-- ===== MODAL: PERFIL ===== -->
      @if (showProfileModal) {
        <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center overflow-y-auto" (click)="showProfileModal=false">
          <div class="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl m-4" (click)="$event.stopPropagation()">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-full bg-[#89A88C]/20 flex items-center justify-center text-2xl font-bold text-[#3B5A45]">
                {{ userNombre ? userNombre[0].toUpperCase() : 'V' }}
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-lg">{{ userNombre }}</h3>
                <span class="text-xs bg-[#89A88C]/20 text-[#3B5A45] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block">Veterinario</span>
              </div>
            </div>
            
            <div class="space-y-3 mb-6">
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Nombre</label>
                <input [(ngModel)]="perfilForm.nombre" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                <input [(ngModel)]="perfilForm.email" type="email" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Especialidad</label>
                <input [(ngModel)]="perfilForm.especialidad" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]">
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-600 mb-1">Tarjeta Profesional</label>
                <input [(ngModel)]="perfilForm.tarjetaProfesional" type="text" class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]">
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

      <!-- ===== MODAL: CLIENTE ===== -->
      @if (showMascotaModal) {
        <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" (click)="showMascotaModal=false">
          <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" (click)="$event.stopPropagation()">
            <h2 class="text-xl font-bold text-gray-900 mb-5">{{ editingMascota?.id ? 'Editar Mascota' : 'Nueva Mascota' }}</h2>
            @if (modalError) { <div class="bg-red-50 text-red-600 rounded-lg px-3 py-2 mb-4 text-sm">{{ modalError }}</div> }
            <div class="space-y-3">
              <div>
                <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Nombre</label>
                <input [(ngModel)]="mascotaForm.nombre" type="text" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]" placeholder="Nombre de la mascota">
              </div>
              <div>
                <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Especie</label>
                <input [(ngModel)]="mascotaForm.especie" type="text" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]" placeholder="Perro, Gato, etc.">
              </div>
              <div>
                <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Raza</label>
                <input [(ngModel)]="mascotaForm.raza" type="text" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]" placeholder="Raza">
              </div>
              <div>
                <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Dueño</label>
                <select [(ngModel)]="mascotaForm.duenoId" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C] bg-white">
                  <option [ngValue]="0" disabled>Seleccione un dueño</option>
                  @for (cliente of clientes; track cliente.id) {
                    <option [ngValue]="cliente.id">{{ cliente.nombre }} - {{ cliente.documentoIdentificacion }}</option>
                  }
                </select>
              </div>
              <div>
                <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Historial Médico</label>
                <textarea [(ngModel)]="mascotaForm.historialMedico" rows="3" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C] resize-none" placeholder="Notas clínicas, vacunas, diagnósticos..."></textarea>
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button (click)="showMascotaModal=false" class="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition">Cancelar</button>
              <button (click)="saveMascota()" [disabled]="savingMascota" class="flex-1 bg-[#89A88C] hover:bg-[#77957A] text-white font-semibold py-2.5 rounded-xl text-sm transition disabled:opacity-60">
                {{ savingMascota ? 'Guardando...' : 'Guardar' }}
              </button>
            </div>
          </div>
        </div>
      }

      <!-- ===== MODAL: CITA ===== -->
      @if (showCitaModal) {
        <div class="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" (click)="showCitaModal=false">
          <div class="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" (click)="$event.stopPropagation()">
            <h2 class="text-xl font-bold text-gray-900 mb-5">{{ editingCita?.id ? 'Editar Cita' : 'Nueva Cita' }}</h2>
            @if (modalError) { <div class="bg-red-50 text-red-600 rounded-lg px-3 py-2 mb-4 text-sm">{{ modalError }}</div> }
            <div class="space-y-3">
              <div>
                <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Mascota</label>
                <select [(ngModel)]="citaForm.mascotaId" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C] bg-white">
                  <option [ngValue]="0" disabled>Seleccione una mascota</option>
                  @for (mascota of mascotas; track mascota.id) {
                    <option [ngValue]="mascota.id">{{ mascota.nombre }} ({{ mascota.especie }} - {{ mascota.raza }})</option>
                  }
                </select>
              </div>
              <div class="flex gap-2">
                <div class="flex-1">
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Fecha</label>
                  <input [(ngModel)]="citaForm.fecha" type="date" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]">
                </div>
                <div class="flex-1">
                  <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Hora</label>
                  <select [(ngModel)]="citaForm.hora" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C] bg-white">
                    @for (time of timeOptions; track time) {
                      <option [value]="time">{{ time }}</option>
                    }
                  </select>
                </div>
              </div>
              <div>
                <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Motivo</label>
                <input [(ngModel)]="citaForm.motivo" type="text" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]" placeholder="Motivo de la cita">
              </div>
              <div>
                <label class="text-xs font-semibold text-gray-600 uppercase tracking-wide">Estado</label>
                <select [(ngModel)]="citaForm.estado" class="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#89A88C]">
                  <option value="Pendiente">Pendiente</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="Cancelada">Cancelada</option>
                  <option value="Completada">Completada</option>
                </select>
              </div>
            </div>
            <div class="flex gap-3 mt-6">
              <button (click)="showCitaModal=false" class="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50 transition">Cancelar</button>
              <button (click)="saveCita()" [disabled]="savingCita" class="flex-1 bg-[#89A88C] hover:bg-[#77957A] text-white font-semibold py-2.5 rounded-xl text-sm transition disabled:opacity-60">
                {{ savingCita ? 'Guardando...' : 'Guardar' }}
              </button>
            </div>
          </div>
        </div>
      }
      <!-- ===== MODAL: EXITO ===== -->
      @if (successMessage) {
        <div class="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl flex flex-col items-center text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">¡Éxito!</h3>
            <p class="text-gray-600 mb-6">{{ successMessage }}</p>
            <button (click)="successMessage=''" class="w-full bg-[#89A88C] hover:bg-[#77957A] text-white font-semibold py-2.5 rounded-xl text-sm transition">
              Aceptar
            </button>
          </div>
        </div>
      }
    </div>
  `
})
export class DashboardPageComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly clienteService = inject(ClienteService);
  private readonly mascotaService = inject(MascotaService);
  private readonly citaService = inject(CitaService);
  private readonly veterinarioService = inject(VeterinarioService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  activeTab = 'dashboard';
  userNombre = localStorage.getItem('user_nombre') || '';
  userEmail = localStorage.getItem('user_email') || '';
  userId = parseInt(localStorage.getItem('user_id') || '0');
  public userRole: string = '';

  perfilForm = { nombre: this.userNombre, email: this.userEmail, especialidad: '', tarjetaProfesional: '' };
  savingPerfil = false;

  // Data
  clientes: any[] = [];
  misClientes: any[] = [];
  mascotas: any[] = [];
  citas: any[] = [];

  // Loading
  loadingClientes = false;
  loadingMascotas = false;
  loadingCitas = false;

  // Errors
  errorClientes = '';
  errorMascotas = '';
  errorCitas = '';
  modalError = '';

  // Modals
  showProfileModal = false;
  showClienteModal = false;
  showMascotaModal = false;
  showCitaModal = false;

  // Editing
  editingCliente: any = null;
  editingMascota: any = null;
  editingCita: any = null;

  // Saving
  savingCliente = false;
  savingMascota = false;
  savingCita = false;

  // Forms
  clienteForm = { email: '', documentoIdentificacion: '' };
  searchEmail = '';
  searchDocumento = '';
  hasSearched = false;
  mascotaForm = { nombre: '', especie: '', raza: '', duenoId: 0, historialMedico: '' };
  citaForm = { mascotaId: 0, fecha: '', hora: '08:00', motivo: '', estado: 'Pendiente' };

  searchCitaFecha = '';
  searchCitaMascota = '';

  get citasFiltradas() {
    return this.citas.filter(c => {
      const matchFecha = !this.searchCitaFecha || c.fechaHora.startsWith(this.searchCitaFecha);
      const mascotaName = this.getMascotaNombre(c.mascotaId).toLowerCase();
      const matchMascota = !this.searchCitaMascota || mascotaName.includes(this.searchCitaMascota.toLowerCase());
      return matchFecha && matchMascota;
    });
  }

  getMascotaNombre(mascotaId: number): string {
    const mascota = this.mascotas.find(m => m.id === mascotaId);
    return mascota ? mascota.nombre : 'Desconocida';
  }

  timeOptions = [
    '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'
  ];

  successMessage = '';

  ngOnInit() {
    this.userRole = localStorage.getItem('user_role') || '';
    this.loadAll();
  }

  loadAll() {
    this.loadMisClientes();
    this.loadCitas();
  }

  loadMisClientes() {
    if (!this.userId) return;
    this.loadingClientes = true;
    this.errorClientes = '';
    this.clienteService.obtenerMisClientes(this.userId)
      .pipe(finalize(() => { this.loadingClientes = false; this.cdr.markForCheck(); }))
      .subscribe({
        next: (data) => {
          this.misClientes = data;
          if (!this.hasSearched) {
            this.clientes = data;
            this.loadMascotas();
          }
          this.cdr.markForCheck();
        },
        error: (e) => {
          this.errorClientes = 'Error al cargar mis clientes: ' + (e.error?.message || e.message);
          this.cdr.markForCheck();
        }
      });
  }

  // ── BÚSQUEDA DE CLIENTES: HTTP GET ───────────────────────────────────────
  // Este método es el único punto de entrada para buscar clientes.
  // Llama EXCLUSIVAMENTE a clienteService.buscar() que hace GET /api/duenos?email=...&documento=...
  // NO abre ningún modal, NO hace POST, NO interactúa con clienteForm ni saveCliente().
  buscarCliente() {
    const email     = this.searchEmail.trim();
    const documento = this.searchDocumento.trim();

    if (!email && !documento) {
      this.errorClientes = 'Ingrese al menos un criterio: correo electrónico o número de identificación.';
      this.cdr.markForCheck();
      return;
    }

    this.errorClientes    = '';
    this.loadingClientes  = true;
    this.hasSearched      = true;
    this.clientes         = [];
    this.cdr.markForCheck();

    this.clienteService.buscar(email, documento)
      .pipe(finalize(() => { this.loadingClientes = false; this.cdr.markForCheck(); }))
      .subscribe({
        next: (data) => {
          this.clientes = data;
          this.loadMascotas();
          this.cdr.markForCheck();
        },
        error: (e) => {
          this.errorClientes = 'Error al buscar clientes: ' + (e.error?.message || e.message);
          this.cdr.markForCheck();
        }
      });
  }

  asociarCliente(duenoId: number) {
    if (!this.userId) return;
    this.clienteService.asociar(this.userId, duenoId).subscribe({
      next: () => {
        this.showSuccessAlert('Cliente asociado correctamente');
        // Actualización in-place reactiva para UI en tiempo real
        const index = this.clientes.findIndex(c => c.id === duenoId);
        if (index !== -1) {
          const updatedClient = { ...this.clientes[index], veterinarioIds: [...(this.clientes[index].veterinarioIds || []), this.userId] };
          this.clientes = [
            ...this.clientes.slice(0, index),
            updatedClient,
            ...this.clientes.slice(index + 1)
          ];
          // Recalcular mascotas de inmediato
          this.mascotas = this.clientes.flatMap((c: any) => c.mascotas || []);
        }
        this.loadMisClientes(); // Sincroniza estado real con backend
        this.cdr.markForCheck();
      },
      error: (e) => {
        this.errorClientes = 'Error al asociar cliente: ' + (e.error?.message || e.message);
        this.cdr.markForCheck();
      }
    });
  }

  eliminarCliente(duenoId: number) {
    if (!this.userId) return;
    if (!confirm('¿Seguro que desea desasociar a este cliente?')) return;
    
    this.clienteService.desasociar(this.userId, duenoId).subscribe({
      next: () => {
        this.showSuccessAlert('Cliente desasociado correctamente');
        // Si estamos en resultados de búsqueda, actualizamos in-place. Si estamos en "mis clientes", lo removemos.
        if (this.hasSearched) {
          const index = this.clientes.findIndex(c => c.id === duenoId);
          if (index !== -1) {
            const updatedClient = { ...this.clientes[index], veterinarioIds: (this.clientes[index].veterinarioIds || []).filter((id: any) => id !== this.userId) };
            this.clientes = [
              ...this.clientes.slice(0, index),
              updatedClient,
              ...this.clientes.slice(index + 1)
            ];
          }
        } else {
          this.clientes = this.clientes.filter(c => c.id !== duenoId);
        }
        
        // Recalcular mascotas de inmediato para que desaparezcan
        this.mascotas = this.clientes.flatMap((c: any) => c.mascotas || []);
        
        this.loadMisClientes(); // Sincroniza estado real con backend
        this.cdr.markForCheck();
      },
      error: (e) => {
        this.errorClientes = 'Error al desasociar cliente: ' + (e.error?.message || e.message);
        this.cdr.markForCheck();
      }
    });
  }
  // Alias interno usado por deleteCliente/saveMascota para recargar tras mutaciones
  loadClientes() {
    if (this.hasSearched) {
      this.buscarCliente();
    } else {
      this.loadMisClientes();
    }
  }

  clearSearch() {
    this.searchEmail    = '';
    this.searchDocumento = '';
    this.hasSearched    = false;
    this.errorClientes  = '';
    this.clientes       = this.misClientes;
    this.loadMascotas();
    this.cdr.markForCheck();
  }


  loadMascotas() {
    // Ya no pedimos todos los registros a la API.
    // La lista se construye a partir de this.clientes.
    if (this.clientes) {
      this.mascotas = this.clientes.flatMap((c: any) => c.mascotas || []);
    }
    this.loadingMascotas = false;
    this.errorMascotas = '';
    this.cdr.markForCheck();
  }

  loadCitas() {
    this.loadingCitas = true;
    this.errorCitas = '';
    this.cdr.markForCheck();

    this.citaService.getAll()
      .pipe(finalize(() => {
        this.loadingCitas = false;
        this.cdr.markForCheck();
      }))
      .subscribe({
        next: (data) => {
          this.citas = data;
          this.cdr.markForCheck();
        },
        error: (e) => {
          this.errorCitas = 'Error al cargar citas: ' + (e.error?.message || e.message);
          this.cdr.markForCheck();
        }
      });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  guardarPerfil() {
    if (!this.userId) return;
    this.savingPerfil = true;
    this.veterinarioService.update(this.userId, this.perfilForm).subscribe({
      next: () => {
        this.savingPerfil = false;
        this.userNombre = this.perfilForm.nombre;
        localStorage.setItem('user_nombre', this.perfilForm.nombre);
        localStorage.setItem('user_email', this.perfilForm.email);
        this.showProfileModal = false;
        this.showSuccessAlert('Perfil guardado exitosamente.');
      },
      error: () => this.savingPerfil = false
    });
  }

  showSuccessAlert(msg: string) {
    this.successMessage = msg;
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

  // Mascota CRUD
  openMascotaModal(m?: any) {
    this.editingMascota = m || null;
    this.modalError = '';
    this.mascotaForm = m ? { nombre: m.nombre, especie: m.especie, raza: m.raza, duenoId: m.duenoId, historialMedico: m.historialMedico || '' } : { nombre: '', especie: '', raza: '', duenoId: 0, historialMedico: '' };
    this.showMascotaModal = true;
  }

  saveMascota() {
    this.savingMascota = true;
    this.modalError = '';
    const obs = this.editingMascota?.id
      ? this.mascotaService.update(this.editingMascota.id, this.mascotaForm)
      : this.mascotaService.create(this.mascotaForm);
    obs.subscribe({
      next: () => { 
        this.showMascotaModal = false; 
        this.savingMascota = false; 
        this.loadMascotas(); 
        this.loadClientes(); // <-- Recargar clientes para reflejar la mascota añadida
        this.showSuccessAlert('Mascota guardada exitosamente.'); 
      },
      error: (e) => { this.modalError = e.error?.message || 'Error al guardar.'; this.savingMascota = false; }
    });
  }

  deleteMascota(id: number) {
    if (!confirm('¿Eliminar esta mascota?')) return;
    this.mascotaService.delete(id).subscribe({
      next: () => {
        this.loadMascotas();
        this.loadClientes(); // <-- Recargar clientes para reflejar la mascota eliminada
      },
      error: (e) => this.errorMascotas = e.error?.message || 'Error al eliminar.'
    });
  }

  // Cita CRUD
  openCitaModal(c?: any) {
    this.editingCita = c || null;
    this.modalError = '';
    if (c && c.fechaHora) {
      const dateObj = new Date(c.fechaHora);
      const isoString = dateObj.toISOString();
      const fecha = isoString.split('T')[0];
      const ampm = dateObj.getHours() >= 12 ? 'PM' : 'AM';
      let hours = dateObj.getHours() % 12;
      hours = hours ? hours : 12; // 0 debe ser 12
      const strTime = (hours < 10 ? '0'+hours : hours) + ':00 ' + ampm; // Simplified minutes to 00
      this.citaForm = { mascotaId: c.mascotaId, fecha: fecha, hora: strTime, motivo: c.motivo, estado: c.estado };
    } else {
      this.citaForm = { mascotaId: 0, fecha: '', hora: '08:00 AM', motivo: '', estado: 'Pendiente' };
    }
    this.showCitaModal = true;
  }

  saveCita() {
    this.savingCita = true;
    this.modalError = '';

    // Convert fecha and hora to ISO string
    // hora format is like '08:00 AM'
    const parts = this.citaForm.hora.split(' ');
    let [h, m] = parts[0].split(':');
    let hour = parseInt(h);
    if (parts[1] === 'PM' && hour < 12) hour += 12;
    if (parts[1] === 'AM' && hour === 12) hour = 0;
    
    const dateObj = new Date(this.citaForm.fecha);
    dateObj.setHours(hour, parseInt(m), 0, 0);
    const fechaHora = dateObj.toISOString();

    const payload = {
      mascotaId: this.citaForm.mascotaId,
      fechaHora: fechaHora,
      motivo: this.citaForm.motivo,
      estado: this.citaForm.estado,
      veterinarioId: this.userId
    };

    const obs = this.editingCita?.id
      ? this.citaService.update(this.editingCita.id, payload)
      : this.citaService.create(payload);
    obs.subscribe({
      next: () => { this.showCitaModal = false; this.savingCita = false; this.loadCitas(); this.showSuccessAlert('Cita guardada exitosamente.'); },
      error: (e) => { this.modalError = e.error?.message || 'Error al guardar.'; this.savingCita = false; }
    });
  }

  deleteCita(id: number) {
    if (!confirm('¿Eliminar esta cita?')) return;
    this.citaService.delete(id).subscribe({
      next: () => this.loadCitas(),
      error: (e) => this.errorCitas = e.error?.message || 'Error al eliminar.'
    });
  }
}
