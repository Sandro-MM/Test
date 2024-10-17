import {Component, Input} from '@angular/core';
import {RadioData} from '../../interfaces/radio-data.model';
import {RadioButtonModule} from 'primeng/radiobutton';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [
    RadioButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css']
})
export class RadioGroupComponent {
  @Input({required: true}) form!: FormGroup;
  @Input({required: true}) control!: string;
  @Input({required: true}) data!: RadioData[];
}
