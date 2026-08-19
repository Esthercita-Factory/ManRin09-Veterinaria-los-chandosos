import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-[#FDFBF7] font-sans text-gray-800 flex flex-col justify-between">
      <!-- Shared Reusable Navbar -->
      <app-navbar></app-navbar>

      <!-- Hero Section -->
      <section class="flex h-[500px] bg-[#89A88C] overflow-hidden">
        <div class="w-1/2 flex flex-col justify-center pl-16 pr-8 text-white">
          <h1 class="text-5xl font-bold mb-6 leading-tight">Welcome to Veterinaria los chandosos.<br>Compassionate Care for Your Furry Family.</h1>
          <div>
            <button class="bg-[#FDFBF7] text-[#7F9F80] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">Book an Appointment</button>
          </div>
        </div>
        <div class="w-1/2 relative">
          <img src="https://images.unsplash.com/photo-1599443015574-be5fe8a05783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Veterinarian with a dog" class="absolute inset-0 w-full h-full object-cover object-left" />
        </div>
      </section>

      <!-- Services Section -->
      <section class="py-20 px-8 bg-[#FDFBF7] text-center">
        <h2 class="text-3xl font-bold text-[#7F9F80] mb-12">Our Specialized Services</h2>
        <div class="flex justify-center gap-16 max-w-5xl mx-auto">
          <!-- Service 1 -->
          <div class="flex flex-col items-center max-w-xs">
            <svg class="w-16 h-16 text-[#7F9F80] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            <h3 class="font-bold text-lg mb-2">Comprehensive Checkups</h3>
            <p class="text-sm text-gray-600">Comprehensive checkups can helps your veterinart ancouratos cnesting and feting care moderims.</p>
          </div>
          <!-- Service 2 -->
          <div class="flex flex-col items-center max-w-xs">
            <svg class="w-16 h-16 text-[#7F9F80] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
            <h3 class="font-bold text-lg mb-2">Advanced Surgery</h3>
            <p class="text-sm text-gray-600">Scalpied surgery and advanced surgery and bloooweccraems out for pwr family.</p>
          </div>
          <!-- Service 3 -->
          <div class="flex flex-col items-center max-w-xs">
            <svg class="w-16 h-16 text-[#7F9F80] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 15.536c-1.171 1.952-3.07 1.059-4.242 0-1.172-1.059-2.07-2.958 0-4.242m0 0c1.172-1.059 3.07-1.952 4.242 0 1.172 1.059 2.07 2.958 0 4.242zm0 0L19 21M5 3l14 14M5 3l2.879 2.879M5 3L2.121 5.879"></path></svg>
            <h3 class="font-bold text-lg mb-2">Pet Grooming</h3>
            <p class="text-sm text-gray-600">Pet grooming includes petvono and momh and samtn-west ehwting and health nee therapy.</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-16 bg-[#89A88C] text-center text-white">
        <h2 class="text-3xl font-bold mb-6">Ready to schedule a visit?</h2>
        <button class="bg-[#FDFBF7] text-[#7F9F80] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">Book an Appointment Now</button>
      </section>

      <!-- Shared Reusable Footer -->
      <app-footer></app-footer>
    </div>
  `,
  styles: []
})
export class HomePageComponent {
}
