import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  template: `
  <div class="container">
  <h1>User Data</h1>
  <div class="card">
  <div class="card-body">
    <h5 class="card-title">Name: {{ userDataComments?.User.name }}</h5>
    <p class="card-text">UserName: {{ userDataComments?.User.username }}</p>
    <p class="card-text">Email: {{ userDataComments?.User.email }}</p>
    <p class="card-text">Address: {{ userDataComments?.User.address.street }},
    {{ userDataComments?.User.address.suite }}, {{ userDataComments?.User.address.city }},
    {{ userDataComments?.User.address.zipcode }},
    latitude: {{ userDataComments?.User.address.geo.lat }}
    longitude: {{ userDataComments?.User.address.geo.lng }}
    </p>
    <p class="card-text">Phone: {{ userDataComments?.User.phone }}</p>
    <p class="card-text">Website: {{ userDataComments?.User.website }}</p>
    <p class="card-text">Company: {{ userDataComments?.User.company.name }},
                                  {{ userDataComments?.User.company.catchPhrase }},
                                  {{ userDataComments?.User.company.bs }}
    </p>
    <h3>Comments</h3>
    <div class="alert alert-primary" role="alert"
    *ngFor="let comments of userDataComments?.Comments">
         <span class="d-block p-2 bg-primary text-white">{{ comments.title }}</span>
          <span>{{ comments.body }}</span>
    </div>
  </div>
</div>
  </div>
  `
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
    return userCommentsData ? { User: { ...userCommentsData[0]}, Comments: userCommentsData[1] }
                            : userCommentsData;
  }

  ngOnInit() {
    this.renderUserWithComments();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


}
