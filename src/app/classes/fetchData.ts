import {catchError, Observable} from "rxjs";


export class FetchData<T> {
  data: T | undefined;
  isLoading = false;
  hasError = false;
  private action$: Observable<T> | undefined;

  load(action$: Observable<T>) {
    this.isLoading = true;
    this.hasError = false;
    this.action$ = action$;
    this.action$
      .pipe(
        catchError(() => {
          this.isLoading = false;
          this.hasError = true;
          this.data = undefined;
          return [];
        }
      ))
      .subscribe((data) => {
        this.isLoading = false;
        this.hasError = false;
        this.data = data;
      });
  }
}
