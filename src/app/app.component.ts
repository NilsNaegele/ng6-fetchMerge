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
    this.userSubscription = this.userService.invokeUserWithComments()
                            .subscribe(userWithComments => {
                            this.userDataComments = userWithComments ?
                             {User: { ...userWithComments[0]}, Coments: userWithComments[1]}
                             : userWithComments;
    });
  }

  ngOnInit() {
    this.renderUserWithComments();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


}
