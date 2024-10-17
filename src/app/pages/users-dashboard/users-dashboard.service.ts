import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {UserProfile} from '../../interfaces/profile.model';
import {catchError, finalize, Observable, of, tap} from 'rxjs';
import {ApiService} from '../../api-service/apiService.service';
import {setErrorMessage} from '../../components/error-handling/api-error-function';
import {buildQuery} from '../../functions/querry-function/querry-function';
import {UsersDashboardComponent} from './users-dashboard.component';

interface UserListState {
  isLoading: boolean,
  usersList: UserProfile[] | undefined,
  totalRecords: number
  error: string | null
}

@Injectable({
  providedIn: UsersDashboardComponent
})

export class UsersDashboardService {
  private apiService = inject(ApiService);
  private state = signal<UserListState>({
    isLoading: false,
    usersList: undefined,
    error: null,
    totalRecords: 0
  })

  isLoadingSelector: Signal<boolean> = computed(() => this.state().isLoading);
  usersListSelector: Signal<UserProfile[] | undefined> = computed(() => this.state().usersList);
  totalRecords: Signal<number> = computed(() => this.state().totalRecords);
  errorMessageSelector: Signal<string | null> = computed(() => this.state().error);

  public fetchUsers(
    page: number,
    pageSize: number,
    sortField?: string,
    sortOrder?: number,
    filters?: { [key: string]: any }
  ) {
    this.setLoadingIndicator(true);
    const query = buildQuery(page, pageSize, sortField, sortOrder, filters);
    this.apiService.getList(query).pipe(
      tap(response => this.updateUsersList(response.users, response.totalRecords)),
      catchError((err: HttpErrorResponse) => this.handleError(err)),
      finalize(() => this.setLoadingIndicator(false))
    ).subscribe();
  }

  private updateUsersList(users: UserProfile[], totalRecords: number) {
    this.state.update((state: UserListState) => ({
      ...state,
      usersList: users,
      totalRecords: totalRecords
    }));
  }

  private setLoadingIndicator(isLoading: boolean) {
    this.state.update((state: UserListState) => ({
      ...state,
      isLoading: isLoading
    }))
  }

  private handleError(err: HttpErrorResponse): Observable<UserProfile[]> {
    const errorMessage = setErrorMessage(err);
    this.state.update((state: UserListState) => ({
      ...state,
      error: errorMessage
    }));
    return of([]);
  }
}
