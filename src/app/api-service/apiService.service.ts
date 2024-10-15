import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserProfile} from '../interfaces/profile.model';
import {Observable, of} from 'rxjs';
import {UserLogin} from '../interfaces/login.model';
import {UserRegister} from '../interfaces/register.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient)

  getList(): Observable<UserProfile[]> {
    return of([
      {
        firstName: "GIo",
        lastName: "Giorgi",
        pin: "33444444433",
        address: "Didi Digomi",
        phoneNumber: "568223344",
        selectedGender: "Man",
        profilePicture: null,
        identifier: '159fcb9748f31c3639acbe2fae9aeedd445e4276ae712daca26da0b6854914bb'
      }
    ]);
  }

  loginUser(loginData :UserLogin ): Observable<string> {
    //ლოგინი პირობითია აპიაი არ არის მაგაზე გათვლილი
    console.log(loginData)
    return of('token');
  }

  registerUser(registerData :UserRegister ): Observable<string> {
    //რეგისტრაცია პირობითია აპიაი არ არის მაგაზე გათვლილი
    console.log(registerData)
    return of('token');
  }

  createUser(userData :UserProfile ): Observable<string> {
    return of('success');
  }

  editUser(loginData :UserProfile ): Observable<string> {
    return of('success');
  }
}
