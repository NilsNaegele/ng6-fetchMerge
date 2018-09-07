import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  template: `
  <h1>Fetch & Merge Data</h1>
  <code class="format">{{ userDataComments | json }}</code>
  `,
  styles: [`
      .format {
        white-space: pre-wrap;
      }
  `]
})
export class AppComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  public userDataComments: any;

  constructor(private userService: UserService) { }

  private renderUserWithComments(): void {
    this.userSubscription = this.userService.getUserWithComments()
                            .subscribe(userWithComments => {
                            this.userDataComments = this.mergeUserData(userWithComments);
    });
  }

  private mergeUserData(userCommentsData: any): any {
    return userCommentsData ? { User: { ...userCommentsData[0]}, Coments: userCommentsData[1] }
                            : userCommentsData;
  }

  ngOnInit() {
    this.renderUserWithComments();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


}
