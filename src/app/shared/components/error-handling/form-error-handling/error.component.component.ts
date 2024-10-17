import {Component, Input} from '@angular/core';
import {Message} from 'primeng/message';

@Component({
  selector: 'app-error',
  template: `

    @if (errorMessage) {
      <p-message severity="error">
        {{ errorMessage }}
      </p-message>
    }
  `,
  standalone: true,
  imports: [
    Message
  ]
})
export class ErrorComponentComponent {
  @Input() errorMessage: string | null = null;
}
