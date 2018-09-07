import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/forkJoin';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDataUrl = 'https://jsonplaceholder.typicode.com/users/1';
  private userCommentsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=1';

  constructor(private http: HttpClient) { }

  public getUserWithComments(): Observable<any> {
    return this.fetchCombinedData(this.userDataUrl, this.userCommentsUrl);
  }

  private fetchCombinedData(firstUrl: string, secondUrl: string): Observable<any> {
   return Observable.forkJoin(this.getData(firstUrl), this.getData(secondUrl));
  }

  private getData(url: string): Observable<any> {
    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError('getData', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
