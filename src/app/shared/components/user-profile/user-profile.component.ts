import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {UserProfile} from '../../shared/interfaces/profile.model';
import {AvatarModule} from 'primeng/avatar';
import {ChipModule} from 'primeng/chip';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    AvatarModule,
    ChipModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserProfileComponent {

  @Input({required:true})UserData!:UserProfile | null
}
