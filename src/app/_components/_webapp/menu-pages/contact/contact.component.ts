import { Lead } from './../../../../_models/lead';
import { Component, OnInit } from '@angular/core';
import { LeadService } from 'src/app/_services/lead.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {

  constructor(private leadService: LeadService) { }

  ngOnInit() {
  }

  public sendInquiries() {
    const parentElement = document.querySelector('#inquiries') as HTMLDivElement;

    let lead = new Lead();
    lead = {
      firstName: (parentElement.querySelector('[name="firstName"]') as HTMLInputElement).value,
      lastName: (parentElement.querySelector('[name="lastName"]') as HTMLInputElement).value,
      email: (parentElement.querySelector('[name="email"]') as HTMLInputElement).value,
      phone: (parentElement.querySelector('[name="phoneNumber"]') as HTMLInputElement).value,
      address: '',
      message: (parentElement.querySelector('[name="message"]') as HTMLTextAreaElement).value,
      statusId: 1,
      source: 'Inquiry',
      fromPage: document.location.href,
      customerId: null
      } as Lead;

    this.leadService.save(lead).subscribe((data) => {
      console.log(data);
      alert('Thank you.');
      location.href = '/';
    });
  }

  public requestBrochure() {
    const parentElement = document.querySelector('#brochure') as HTMLDivElement;

    let lead = new Lead();
    lead = {
      firstName: (parentElement.querySelector('[name="firstName"]') as HTMLInputElement).value,
      lastName: (parentElement.querySelector('[name="lastName"]') as HTMLInputElement).value,
      email: (parentElement.querySelector('[name="email"]') as HTMLInputElement).value,
      phone: (parentElement.querySelector('[name="phoneNumber"]') as HTMLInputElement).value,
      address: (parentElement.querySelector('[name="address"]') as HTMLInputElement).value,
      message: '',
      statusId: 1,
      source: 'Brochure',
      fromPage: document.location.href,
      customerId: null
      } as Lead;

    this.leadService.save(lead).subscribe((data) => {
      console.log(data);
      alert('Thank you.');
      location.href = '/';
    });
  }
}
