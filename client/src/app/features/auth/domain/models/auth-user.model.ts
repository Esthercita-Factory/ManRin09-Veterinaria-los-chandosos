export interface AuthUser {
  id: string;
  usuarioId: number;
  nombre: string;
  email: string;
  token: string;
  rol: 'Veterinario' | 'Dueno';
}
