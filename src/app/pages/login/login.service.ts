import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError, delay, finalize, of, tap} from 'rxjs';
import {ApiService} from '../../api-service/apiService.service';
import {setErrorMessage} from '../../components/error-handling/api-error-function';
import {UserLogin} from '../../interfaces/login.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiService = inject(ApiService);

  private state = signal<LoginState>({
    isLoading: false,
    response: null,
    error: null,
  });

  isLoadingSelector: Signal<boolean> = computed(() => this.state().isLoading);
  responseSelector: Signal<any | null> = computed(() => this.state().response);
  errorMessageSelector: Signal<string | null> = computed(() => this.state().error);

  public loginUser(loginUser: UserLogin) {
    this.setLoadingIndicator(true);

    this.apiService.loginUser(loginUser).pipe(
      tap((response: any) => {
        if (response) {
          localStorage.setItem('authToken', response);
        }
        this.setResponse(true);
      }),
      delay(1000),
      catchError((err: HttpErrorResponse) => {
        this.handleError(err);
        return of(undefined);
      }),
      finalize(() => this.setLoadingIndicator(false))
    ).subscribe();
  }

  private setResponse(response: any) {
    this.state.update((state: LoginState) => ({
      ...state,
      response: response,
      error: null,
    }));

    setTimeout(() => {
      this.clearResponse();
    }, 5000);
  }

  private clearResponse() {
    this.state.update((state: LoginState) => ({
      ...state,
      response: null,
    }));
  }

  private setLoadingIndicator(isLoading: boolean) {
    this.state.update((state: LoginState) => ({
      ...state,
      isLoading,
    }));
  }


  private handleError(err: HttpErrorResponse) {
    const errorMessage = setErrorMessage(err);
    this.state.update((state: LoginState) => ({
      ...state,
      error: errorMessage,
    }));
  }
}

export interface LoginState{
  isLoading: boolean;
  response: any | null;
  error: string | null;
}

