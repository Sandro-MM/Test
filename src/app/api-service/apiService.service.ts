import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserProfile} from '../interfaces/profile.model';
import {from, Observable, of, switchMap} from 'rxjs';
import {UserLogin} from '../interfaces/login.model';
import {UserRegister} from '../interfaces/register.model';
import {addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, updateDoc} from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient)
  firestore: Firestore = inject(Firestore);
  storage: Storage = inject(Storage);

  getList(): Observable<UserProfile[]> {
    const usersCollection = collection(this.firestore, 'users');
    return from(
      getDocs(usersCollection).then((querySnapshot) =>
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            firstName: data['firstName'],
            lastName: data['lastName'],
            pin: data['pin'],
            address: data['address'],
            phoneNumber: data['phoneNumber'],
            selectedGender: data['selectedGender'],
            profilePicture: data['profilePicture'],
            identifier: doc.id,
          } as UserProfile;
        })
      )
    );
  }

  getUserById(identifier: string): Observable<UserProfile | undefined> {
    const userDocRef = doc(this.firestore, `users/${identifier}`);
    return from(
      getDoc(userDocRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          return {
            firstName: data['firstName'],
            lastName: data['lastName'],
            pin: data['pin'],
            address: data['address'],
            phoneNumber: data['phoneNumber'],
            selectedGender: data['selectedGender'],
            profilePicture: data['profilePicture'],
            identifier: docSnap.id,
          } as UserProfile;
        } else {
          return undefined;
        }
      })
    );
  }

  updateUserById(identifier: string, updatedData: Partial<UserProfile>): Observable<void> {
    const userDocRef = doc(this.firestore, `users/${identifier}`);
    if (updatedData.profilePicture && updatedData.profilePicture.objectURL) {
      const filePath = `profilePictures/${identifier}`;
      return this.uploadProfilePicture(updatedData.profilePicture.objectURL.changingThisBreaksApplicationSecurity, filePath).pipe(
        switchMap((downloadURL) => {
          updatedData.profilePicture = downloadURL;
          return from(updateDoc(userDocRef, { ...updatedData }));
        })
      );
    } else {
      return from(updateDoc(userDocRef, { ...updatedData }));
    }
  }

  deleteUserById(identifier: string): Observable<void> {
    const userDocRef = doc(this.firestore, `users/${identifier}`);
    return from(deleteDoc(userDocRef));
  }

  createUser(newUser: UserProfile): Observable<any> {
    const usersCollection = collection(this.firestore, 'users');
    if (newUser.profilePicture && newUser.profilePicture.objectURL) {
      const filePath = `profilePictures/${newUser.identifier}`;
      return this.uploadProfilePicture(newUser.profilePicture.objectURL.changingThisBreaksApplicationSecurity, filePath).pipe(
        switchMap((downloadURL) => {
          newUser.profilePicture = downloadURL;
          return from(addDoc(usersCollection, { ...newUser }));
        })
      );
    } else {
      return from(addDoc(usersCollection, { ...newUser }));
    }
  }
  //ესე ფრონტიდან ძალიან არ მომწონს სურათის დამატება მარა Firebase ში პირდაპირ სხვა გზა არაა...
  private uploadProfilePicture(blobUrl: string, path: string): Observable<string> {
    return from(fetch(blobUrl).then((response) => response.blob())).pipe(
      switchMap((blob) => {
        const fileRef = ref(this.storage, path);
        return from(uploadBytes(fileRef, blob)).pipe(
          switchMap(() => getDownloadURL(fileRef))
        );
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
