import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="flex flex-col sm:flex-row items-center justify-between px-16 py-8 bg-[#FDFBF7] border-t border-gray-200 text-sm text-gray-600 gap-4">
      <div>
        <p class="font-medium text-gray-700">(932) 457-8390</p>
        <p>www.huellitasfelices.com</p>
      </div>
      <div class="flex gap-4">
        <a href="#" class="w-8 h-8 rounded-full bg-[#D1C9BE] hover:bg-[#b8afa3] flex items-center justify-center text-white font-bold transition">f</a>
        <a href="#" class="w-8 h-8 rounded-full bg-[#D1C9BE] hover:bg-[#b8afa3] flex items-center justify-center text-white font-bold transition">x</a>
        <a href="#" class="w-8 h-8 rounded-full bg-[#D1C9BE] hover:bg-[#b8afa3] flex items-center justify-center text-white font-bold transition">in</a>
      </div>
      <div>
        <p>© Huellitas Felices - Todos los derechos reservados</p>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {}
