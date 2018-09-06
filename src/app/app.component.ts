import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  template: `
  <h1>Fetch & Merge Data</h1>
  <div class="format">{{ userData | json }}</div>
  <p class="format">{{ userComments | json }}</p>
  `,
  styles: [`
      .format {
        white-space: pre-wrap;
      }
  `]
})
export class AppComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  public userData: {};
  public userComments: string[];

  constructor(private userService: UserService) { }

  private renderUserWithComments(): void {
    this.userSubscription = this.userService.invokeUserWithComments()
                            .subscribe(userWithComments => {
                            this.userData = userWithComments[0];
                            this.userComments = userWithComments[1];
    });
  }

  ngOnInit() {
    this.renderUserWithComments();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


}
