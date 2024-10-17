import {HttpErrorResponse} from '@angular/common/http';

export function setErrorMessage(err: HttpErrorResponse): string {
  let errorMessage: string;
  if (err.error instanceof ErrorEvent) {
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    errorMessage = `Backend returned code ${err.status}: ${err.message}`;
  }
  console.error(err);
  return errorMessage;
}
