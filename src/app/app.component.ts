import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Aura } from 'primeng/themes/aura';
import {ToastModule} from 'primeng/toast';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private config: PrimeNGConfig) {
    this.config.theme.set({ preset: Aura });
  }

  title = 'task_test';
}
