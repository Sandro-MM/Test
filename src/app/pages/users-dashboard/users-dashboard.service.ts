import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {UserProfile} from '../../interfaces/profile.model';
import {catchError, finalize, Observable, of, tap} from 'rxjs';
import {ApiService} from '../../api-service/apiService.service';
import {setErrorMessage} from '../../components/error-handling/api-error-function';
import {UsersDashboardComponent} from './users-dashboard.component';
import {userListResolver} from '../../resolvers/user-list.resolver';

@Injectable({
  providedIn: 'root'
})

export class UsersDashboardService{
  private apiService = inject(ApiService);
  private state = signal<UserListState>({
    isLoading: false,
    usersList: undefined,
    error: null
  })

  isLoadingSelector:Signal<boolean> = computed(() => this.state().isLoading);
  usersListSelector:Signal<UserProfile[] | undefined> = computed(() => this.state().usersList);
  errorMessageSelector:Signal<string | null> = computed(() => this.state().error);

  public fetchUsers() {
    this.setLoadingIndicator(true);
    this.apiService.getList().pipe(
      tap((list:UserProfile[]) => this.updateUsersList(list)),
      catchError((err: HttpErrorResponse) => this.handleError(err)),
      finalize(() => this.setLoadingIndicator(false))
    ).subscribe();
  }

  private setLoadingIndicator(isLoading: boolean) {
    this.state.update((state:UserListState) => ({
      ...state,
      isLoading: isLoading
    }))
  }

  private updateUsersList(list: UserProfile[]) {
    this.state.update((state:UserListState) => ({
      ...state,
      usersList: list
    }));
  }
  private handleError(err: HttpErrorResponse): Observable<UserProfile[]> {
    const errorMessage = setErrorMessage(err);
    this.state.update((state:UserListState) => ({
      ...state,
      error: errorMessage
    }));
    return of([]);
  }
}
export interface UserListState {
  isLoading: boolean,
  usersList: UserProfile[] | undefined,
  error: string | null
}
