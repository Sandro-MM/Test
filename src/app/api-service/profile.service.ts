import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {UserProfile} from '../interfaces/profile.model';

let mockProfileData:UserProfile = {
  id: 1,
  firstName: 'John',
  lastName:'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '1234567890',
  profilePicture: null
};


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  getUserProfile() {
    return of(mockProfileData).pipe(delay(1000));
  }

  updateUserProfile(updatedData: UserProfile) {

    mockProfileData = updatedData

    return of({ success: true }).pipe(delay(1000));
  }
}
