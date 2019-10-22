import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.less']
})
export class PoliciesComponent implements OnInit {
  public policies = [
    {
      title: 'Tour Cost including Deposits',
      // tslint:disable-next-line:max-line-length
      description: 'Your initial tour deposits are now 75% non refundable. 25% of your initial deposit can be transferred up to 150 days prior to travel date to another tour within the same calendar year. New reservation must be made for the same traveler, otherwise, name change fees apply. Collins Tours has supplier agreements to meet and is not responsible for client’s misfortunes, sickness, illness, or changes in decisions to travel. Deposits secure your travel arrangements on the tour in which you have chosen. Balances must be paid in full prior to the tour by designated date or risk of automatic cancellation with full loss of payments. To avoid disappointment we ask for all payments to be met by initial time lines provided on invoices or documents from Collins Tours.'
    }, {
      title: 'Travel Insurance',
      // tslint:disable-next-line:max-line-length
      description: 'Travel insurance can minimize the considerable financial risks of traveling: acts of God, accidents, illness, missed flights, canceled tours, lost baggage, theft. As all our tours are non-refundable, we highly recommend that you consider Travel Insurance. Without travel insurance your travel investment is unprotected and you are also at considerable risk for medical expenses traveling outside of your home province, and outside Canada while traveling abroad.'
    }, {
      title: 'Cross Border &amp; International Travel',
      // tslint:disable-next-line:max-line-length
      description: 'It is the responsibility of each traveler to verify their status with Border Officials prior to commencement of travel to ensure entrance in other countries. Collins Tours is not responsible in any form, not liable for any costs or expenses incurred from denial of entry, refusal of boarding planes, trains or cruises abroad, or any additional transportation. You must ensure your passports are valid for the required length of time to visit each country you will be entering, typically 6 months after your return date to Canada, in order to avoid disappointment while traveling into different countries. Refunds, reimbursements, credits, change compensation, of any kind will not be provided by Collins Tours for any of the events, reasons, or circumstances listed above, or any circumstances causing similar results or misfortunes.'
    }, {
      title: 'Seat Rotation &amp; Accessibility',
      // tslint:disable-next-line:max-line-length
      description: 'There are no exceptions to seat rotation, which is carried out and explained by the Tour Manager; unless the office was provided a certified note from a physician. A physician’s note will allow you to sit in the front third of the motorcoach but it will not give you a set seat, you will still have to take part in seat rotation. Travelers requiring assistance must be accompanied by a companion who will be fully responsible while on tour. Tour managers are not permitted to personally assist partially disabled clients. Help is provided at all times and personal companions are recommended for those who need daily assistance. Tour managers or Collins Tours is not responsible or liable for guests who are not be able to attend events due to personal abilities.'
    }, {
      title: 'Luggage Allowance – Motorcoach',
      // tslint:disable-next-line:max-line-length
      description: 'Each guest is allowed one large suitcase that does not exceed 50lbs, which is stored in the luggage compartment below the coach, one carry-on bag suitable for storage in the overhead compartment or under your seat and a personal item such as a purse or camera bag.'
    }, {
      title: 'Luggage Allowance – Flights',
      // tslint:disable-next-line:max-line-length
      description: 'Each guest is allowed one large suitcase that does not exceed 50lbs, which will be checked luggage with the airline. Many of our tours include the cost for the 1 st checked bag, please confirm with our Sales Team if this is included on the Tour you are considering. Luggage fees are structured by the air lines and are paid directly to them upon check in where applicable. Collins Tours is not responsible or liable for reimbursement of damaged or lost luggage, all passengers must ensure they have travel insurance for coverage. If no such insurance exists, all clients must contact individual airlines directly for appropriate action or reimbursements if applicable.'
    }, {
      title: 'Name Changes or Corrections',
      // tslint:disable-next-line:max-line-length
      description: 'Should your travel plans change and a substitution of a passenger is required, please be aware that a minimum administration fee of $100 CAD will be charged per change for any of our Escorted Vacations. Name changes can be made up until 14 days prior to departure date. Name changes are not permitted on tours that include transportation by airline and/or cruise line. Other travel transportation methods may have additional restrictions. Collins Tours may have to deny changes made within 30 days prior to travel. It is the passenger’s responsibility to ensure they have provided proper spelling of names on valid travel documents. Failure to provide these proper spelling of names will result in administration fees.'
    }, {
      title: 'Passenger Conduct',
      // tslint:disable-next-line:max-line-length
      description: 'Please understand that Collins Tours has the right to ask any participant to leave the tour should his/her behavior disrupt the group or Tour Manager from providing the service required to conduct the tour. This is a zero tolerance policy. If such a rare occurrence transpires, no refunds, credits, reimbursements will be provided from Collins Tours.'
    }, {
      title: 'Photography',
      // tslint:disable-next-line:max-line-length
      description: 'Tour Managers may take photographs of you, as part of the group and these maybe used in our print or electronic media without further consent.'
    }, {
      title: 'Travelling with Children',
      // tslint:disable-next-line:max-line-length
      description: 'Our itineraries do not cater to children’s interest or activity levels and are not particularly suited to children. Please use good judgment if bringing a child.'
    }, {
      title: 'Washrooms',
      // tslint:disable-next-line:max-line-length
      description: 'We travel in deluxe European and North American style motor coaches, equipped with an onboard emergency washroom. We intentionally use the word “Emergency” to remind our passengers that the onboard facilities are not intended for regular use, rather we make frequent stops.'
    }, {
      title: 'Itinerary and Final Documents',
      // tslint:disable-next-line:max-line-length
      description: 'The most current itinerary can be found on our website. The itinerary is posted online so passengers can get an approximate idea of how a tour is laid out. No detail contained within can be confirmed until much closer to the departure and are, therefore subject to change until the “final” copy has been mailed or indicated on the website. The final copy will be assembled and sent along with final tour documentation approximately 3 weeks prior to departure. For some of our shorter haul tours, the packages may not be received until 2 weeks prior to departure. Electronic copies may be requested at an earlier date in some cases.'
    }, {
      title: 'Currency',
      // tslint:disable-next-line:max-line-length
      description: 'Most places we visit will accept major credit card and will have Bank Machines to withdraw local currency. We do not recommend travelling with large amount of cash. Consider having a small amount of local currency and using a credit card or accessing cash through the bank machines.'
    }, {
      title: 'Pick Up Locations',
      // tslint:disable-next-line:max-line-length
      description: 'We offer 9 guaranteed passenger pickup locations for our Motorcoach Tours across New Brunswick, Nova Scotia and Prince Edward Island. All locations are identified on our website. For locations not listed, call to inquire.'
    }, {
      title: 'Seat Selection on Airlines',
      // tslint:disable-next-line:max-line-length
      description: 'Our air seats are booked through the Group Travel department for each airline. These reservations are managed differently than a single reservation and have different requirements and restrictions. The most noticeable for our guest is seat selections. With a group reservation, we are not able to request or pre-select seats for any class of service. The seat numbers are provided to us at time the tickets are issued (about 21 days prior to departure) and cannot be changed until the 24hrs Check In on the airline’s website has opened.'
    } 
  ];

  constructor() { }

  ngOnInit() {
  }

}
