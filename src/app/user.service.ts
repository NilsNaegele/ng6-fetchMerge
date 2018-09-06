import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDataUrl = 'https://jsonplaceholder.typicode.com/users/1';
  private userCommentsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=1';

  constructor(private http: HttpClient) { }

  private getData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }


  private fetchMerge(firstUrl: string, secondUrl: string): Observable<any> {
   return Observable.forkJoin(this.getData(firstUrl), this.getData(secondUrl));
  }

  public invokeUserWithComments(): Observable<any> {
    return this.fetchMerge(this.userDataUrl, this.userCommentsUrl);
  }
}
