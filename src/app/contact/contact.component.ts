import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RequestService } from '../request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  public name;
  public phone;
  public edit = false;
  public nameValue: any;
  public phoneValue: any;
  public IdValue: any;
  constructor(
    private request: RequestService,
    private route: ActivatedRoute) {
      this.route.queryParams.subscribe((params: any) => {
        this.edit = params.edit;
        this.nameValue = params.name;
        this.phoneValue = params.phone;
        this.IdValue = params.id;
        this.setForm();
    });

  }

  setForm() {
    if (!this.edit) {
      this.name = new FormControl('', Validators.required);
      this.phone = new FormControl('', Validators.required);
      return;
    }

    this.name = new FormControl(this.nameValue, Validators.required);
    this.phone = new FormControl(this.phoneValue, Validators.required);
  }


  public submit() {
    const data = {
      name: this.name.value,
      phone: this.phone.value
    };
    if (!this.edit) {
      return this.request.createContact(data).subscribe((response: any) => {
        console.log(response);
      });
    }

    return this.request.updateContact(this.IdValue, data).subscribe((response: any) => {
      console.log(response);
    });
  }

}
