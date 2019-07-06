import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public contacts: any;
  public showAdd = false;
  constructor(
    private auth: AuthService,
    private request: RequestService,
    private router: Router
  ) {

  }

  ngOnInit() {
    if (!this.auth.isValidUser()) {
      return;
    }

    this.fetchContacts();
  }

  createTask() {
    this.router.navigate(['contact'], {
      queryParams: {
        edit: false
      }
    });
  }

  edit(contact) {
    this.router.navigate(['contact'], {
      queryParams: {
        edit: true,
        name: contact.name,
        phone: contact.phone,
        id: contact._id
      }
    });
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
