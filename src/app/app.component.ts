import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  template: `
  <h1>Fetch & Merge Data</h1>
  <div class="users-comments format"></div>
  `,
  styles: [`
      .format {
        white-space: pre;
      }
  `]
})
export class AppComponent implements OnInit {

  public userCommentsDOM: any;

  constructor(private userService: UserService) { }

  private renderUsersComments(usersComments): HTMLElement {
      const userElement = document.createElement('p');
      const data = JSON.stringify(usersComments, null, 4);
      const dataNode = document.createTextNode(data);
      userElement.appendChild(dataNode);
      return userElement;
  }

  private renderUserWithComments(): void {
    this.userService.invokeUserWithComments().then(userWithComments => {
        const usersCommentsElement = this.renderUsersComments(userWithComments);
        this.userCommentsDOM.append(usersCommentsElement);
    });
  }

  ngOnInit() {
    this.userCommentsDOM = document.querySelector('.users-comments');
    this.renderUserWithComments();
  }


}
