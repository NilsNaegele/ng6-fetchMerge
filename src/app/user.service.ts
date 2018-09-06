import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDataUrl = 'https://jsonplaceholder.typicode.com/users/1';
  private userCommentsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=1';

  constructor() { }

  private getData(url: string): Promise<any> {
    return fetch(url).then(response => response.json());
  }


  private fetchMerge(firstUrl: string, secondUrl: string, transform: any): Promise<any> {
   return Promise.all([this.getData(firstUrl), this.getData(secondUrl)]).then(
      responses => transform && typeof transform === 'function' ?
      transform(responses) : responses);
  }

  public invokeUserWithComments(): Promise<any> {
    return this.fetchMerge(this.userDataUrl, this.userCommentsUrl,
                           responses => ({ ...responses[0], posts: responses[1]}));
  }
}
