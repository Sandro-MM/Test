import { computed, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {UserProfile} from '../../interfaces/profile.model';
import {catchError, filter, finalize, Observable, of, tap} from 'rxjs';
import {ApiService} from '../../api-service/apiService.service';
import {setErrorMessage} from '../../components/error-handling/api-error-function';
import {ManageUserComponent} from './manage-user.component';

@Injectable({
  providedIn: ManageUserComponent
})

export class ManageUserService{
  private apiService = inject(ApiService);
  private state = signal<UserState>({
    isLoading: false,
    user: undefined,
    response: null,
    error: null
  })

  isLoadingSelector:Signal<boolean> = computed(() => this.state().isLoading);
  userSelector:Signal<UserProfile | undefined> = computed(() => this.state().user);
  responseSelector: Signal<any> = computed(() => this.state().response);
  errorMessageSelector:Signal<string | null> = computed(() => this.state().error);

  public fetchUser(id: string) {
    this.setLoadingIndicator(true);
    this.apiService.getUserById(id).pipe(
      filter((user): user is UserProfile => !!user),
      tap((user: UserProfile) => this.updateUser(user)),
      tap((user: UserProfile) => console.log(user)),

      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return of();
      }),
      finalize(() => this.setLoadingIndicator(false))
    ).subscribe();
  }

  public deleteUser(id: string) {
    this.setLoadingIndicator(true);
    this.apiService.deleteUserById(id).pipe(
      tap(() => {
          this.setResponse('deleted');
      }),
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return of(undefined);
      }),
      finalize(() => this.setLoadingIndicator(false))
    ).subscribe();
  }

  public editUser(id: string, data:UserProfile) {
    this.setLoadingIndicator(true);

    this.apiService.updateUserById(id,data).pipe(
      tap((response: any) => {
          this.setResponse('edited');
      }),

      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return of(undefined);
      }),
      finalize(() => this.setLoadingIndicator(false))
    ).subscribe();
  }

  private setResponse(response: any) {
    this.state.update((state: UserState) => ({
      ...state,
      response: response,
      error: null,
    }));

    setTimeout(() => {
      this.clearResponse();
    }, 5000);
  }

  private clearResponse() {
    this.state.update((state: any) => ({
      ...state,
      response: null,
    }));
  }

  private setLoadingIndicator(isLoading: boolean) {
    this.state.update((state:UserState) => ({
      ...state,
      isLoading: isLoading
    }))
  }

  private updateUser(user: UserProfile) {
    this.state.update((state:UserState) => ({
      ...state,
      user: user
    }));
  }
  private handleError(err: HttpErrorResponse): Observable<UserProfile> {
    const errorMessage = setErrorMessage(err);
    this.state.update((state:UserState) => ({
      ...state,
      error: errorMessage
    }));
    return of();
  }
}
export interface UserState {
  isLoading: boolean,
  user: UserProfile | undefined,
  response: string | null,
  error: string | null
}
