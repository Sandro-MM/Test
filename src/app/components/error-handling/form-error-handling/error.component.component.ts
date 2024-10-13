import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-error',
  template: `

    @if(errorMessage){
      <div class="error-message">
        {{ errorMessage }}
      </div>
    }
  `,
  styles: [`
    .error-message {
      margin: 5px 0;
      width: max-content;
      color: white;
      padding: 2px 6px;
      background: #bb1b1b;
      border-radius:2px;
      font-size: 14px;

    }

    :host {
      display: block;
      position: relative;
    }
  `],
  standalone: true,
})
export class ErrorComponentComponent {
  @Input() errorMessage: string | null = null;
}
