import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserProfile} from '../interfaces/profile.model';
import {from, map, Observable, of, switchMap} from 'rxjs';
import {UserLogin} from '../interfaces/login.model';
import {UserRegister} from '../interfaces/register.model';
import {apiUrl} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 private  apiUrl = apiUrl
 private http = inject(HttpClient)


  getList(query: string): Observable<{ users: UserProfile[]; totalRecords: number }> {
    return this.http.get<UserProfile[]>(`${this.apiUrl}${query}`, { observe: 'response' }).pipe(
      map(response => {
        const totalRecords = Number(response.headers.get('X-Total-Count')) || 0;
        return {
          users: response.body ?? [],
          totalRecords
        };
      })
    );
  }

  getUserById(identifier: string): Observable<UserProfile | undefined> {
    return this.http.get<UserProfile>(`${this.apiUrl}/${identifier}`);
  }

  updateUserById(identifier: string, updatedData: Partial<UserProfile>): Observable<void> {
    if (updatedData.profilePicture && updatedData.profilePicture.objectURL) {
      const filePath = `profilePictures/${identifier}`;
      return this.uploadProfilePicture(updatedData.profilePicture.objectURL.changingThisBreaksApplicationSecurity, filePath).pipe(
        switchMap((downloadURL) => {
          updatedData.profilePicture = downloadURL;
          return this.http.put<void>(`${this.apiUrl}/${identifier}`, updatedData);
        })
      );
    } else {
      return this.http.put<void>(`${this.apiUrl}/${identifier}`, updatedData);
    }
  }

  deleteUserById(identifier: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${identifier}`);
  }

  createUser(newUser: UserProfile): Observable<any> {
   console.log(newUser)
    if (newUser.profilePicture && newUser.profilePicture.objectURL) {
      const filePath = `profilePictures/${newUser.identifier}`;
      return this.uploadProfilePicture(newUser.profilePicture.objectURL.changingThisBreaksApplicationSecurity, filePath).pipe(
        switchMap((downloadURL) => {
          newUser.profilePicture = downloadURL;
          return this.http.post<any>(this.apiUrl, newUser);
        })
      );
    } else {
      return this.http.post<any>(this.apiUrl, newUser);
    }
  }

  private uploadProfilePicture(blobUrl: string, path: string): Observable<string> {
    return from(fetch(blobUrl).then((response) => response.blob())).pipe(
      switchMap((blob) => {
        const mockDownloadURL = `http://localhost:3000/${path}`;
        return new Observable<string>((observer) => {
          observer.next(mockDownloadURL);
          observer.complete();
        });
      })
    );
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
}
