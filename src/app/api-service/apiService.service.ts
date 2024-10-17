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


  getList(
    page: number,
    pageSize: number,
    sortField?: string,
    sortOrder?: number,
    filters?: { [key: string]: any }
  ): Observable<{ users: UserProfile[]; totalRecords: number }> {
    let query = `?_page=${page/pageSize + 1}&_limit=${pageSize}`;
    if (sortField) {
      query += `&_sort=${sortField}&_order=${sortOrder === 1 ? 'asc' : 'desc'}`;
    }
    if (filters) {
      Object.keys(filters).forEach((key) => {
        const filter = filters[key];
        if (filter.value) {
          switch (filter.matchMode) {
            case 'startsWith':
              query += `&${key}_like=${filter.value}`;
              break;
            case 'contains':
              query += `&${key}_like=${filter.value}`;
              break;
            case 'equals':
              query += `&${key}=${filter.value}`;
              break;
            case 'endsWith':
              query += `&${key}_like=${filter.value}`;
              break;
            case 'notEquals':
              query += `&${key}_ne=${filter.value}`;
              break;
            default:
              break;
          }
        }
      });
    }


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
