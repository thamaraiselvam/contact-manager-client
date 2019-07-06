import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public contacts: any;
  constructor(
    private auth: AuthService,
    private request: RequestService
  ) {

  }

  ngOnInit() {
    if (!this.auth.isValidUser()) {
      return;
    }

    this.fetchContacts();
  }

  private fetchContacts() {
    this.request.fetchContacts().subscribe((result: any) => {
      this.contacts = result.response;
    });
  }

  clear() {
    this.auth.logout();
  }

}
