import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError, finalize, of, tap} from 'rxjs';
import {ApiService} from '../../shared/api-service/apiService.service';
import {setErrorMessage} from '../../shared/functions/api-error/api-error-function';
import {AddUserComponent} from './add-user.component';
import {UserProfile} from '../../shared/interfaces/profile.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

interface AddUserState {
  isLoading: boolean;
  response: any | null;
  error: string | null;
}

@Injectable({
  providedIn: AddUserComponent,
})
export class AddUserService {
  private apiService = inject(ApiService);

  private state = signal<AddUserState>({
    isLoading: false,
    response: null,
    error: null,
  });

  isLoadingSelector: Signal<boolean> = computed(() => this.state().isLoading);
  responseSelector: Signal<any> = computed(() => this.state().response);
  errorMessageSelector: Signal<string | null> = computed(() => this.state().error);

  public addUser(userData: UserProfile) {
    this.setLoadingIndicator(true);
    this.apiService.createUser(userData).pipe(
      tap((response: any) => {
        if (response) {
          this.setResponse(true);
        }
      }),
      takeUntilDestroyed(),
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return of(undefined);
      }),
      finalize(() => this.setLoadingIndicator(false))
    ).subscribe();
  }

  private setResponse(response: any) {
    this.state.update((state: AddUserState) => ({
      ...state,
      response: response,
      error: null,
    }));

    setTimeout(() => {
      this.clearResponse();
    }, 5000);
  }

  private clearResponse() {
    this.state.update((state: AddUserState) => ({
      ...state,
      response: null,
    }));
  }

  private setLoadingIndicator(isLoading: boolean) {
    this.state.update((state: AddUserState) => ({
      ...state,
      isLoading,
    }));
  }


  private handleError(err: HttpErrorResponse) {
    const errorMessage = setErrorMessage(err);
    this.state.update((state: AddUserState) => ({
      ...state,
      error: errorMessage,
    }));
  }
}

