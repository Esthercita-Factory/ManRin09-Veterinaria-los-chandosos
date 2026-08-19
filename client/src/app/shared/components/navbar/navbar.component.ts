import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="flex items-center justify-between px-8 py-6 bg-[#FDFBF7]">
      <div class="flex items-center gap-2 text-[#7F9F80]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-2.5 4c-.8 0-1.5.7-1.5 1.5S4.7 11 5.5 11 7 10.3 7 9.5 6.3 8 5.5 8zm13 0c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5S20 10.3 20 9.5 19.3 8 18.5 8zM12 11c-2.8 0-5 2.2-5 5v1c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-1c0-2.8-2.2-5-5-5z"/>
        </svg>
        <span class="font-bold text-xl leading-tight text-gray-800">Huellitas<br>Felices</span>
      </div>
      <div class="flex items-center gap-8 font-medium">
        <a routerLink="/home" class="text-gray-600 hover:text-[#7F9F80] transition-colors">Home</a>
        <a href="#" class="text-gray-600 hover:text-[#7F9F80] transition-colors">Services</a>
        <a href="#" class="text-gray-600 hover:text-[#7F9F80] transition-colors">About Us</a>
        <button routerLink="/auth/login" class="bg-[#7F9F80] text-white px-6 py-2 rounded-full hover:bg-[#688669] transition-colors shadow-sm">
          Login
        </button>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent {}
