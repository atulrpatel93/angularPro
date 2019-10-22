import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less']
})
export class FAQComponent implements OnInit {

  constructor() { }

  public faqs = [
    {
      title: 'Flights',
      // tslint:disable-next-line:max-line-length
      description: '<b>Do I need to reserve my own airfare?</b> As a result of tight tour scheduling, we strongly advise our passengers to purchase Collins Tours Inclusive Air packages. For a more detailed explanation of Collins Tours Inclusive Air, please read our statement towards the beginning of this brochure. We do not accept responsibility for air arrangements made on your own. On occasion, it is necessary to change tour dates. In this case, we can only protect reservations booked through Collins Tours. It is the responsibility of the guest to check-in to their flight. Collins Tours encourages early flight check-in to ensure a greater selection of seats. Not all airlines offer pre-assigned seats. Some charge a fee for seats which will be at the guests’ expense.'
    }, {
      title: 'Attractions & Sightseeing',
      // tslint:disable-next-line:max-line-length
      description: '<b>Are attractions/sites always available?</b> Access to some attractions or sites may be restricted or limited by holidays, weather conditions or other circumstances. As a result, the order of our sightseeing schedule may require alteration to maximize your tour time. Boat excursions are always reliant on weather. Please note that it is impossible to guarantee wildlife sightings.'
    }, {
      title: 'Physical Demands',
      // tslint:disable-next-line:max-line-length
      description: '<b>How much walking is required?</b> We pride ourselves on making tours accessible to all interested guests; however, some itineraries include mildly challenging activities and may consist of walking on uneven terrain or significant walking at times. In many cases, the most unique and special landmarks and iconic locations can only be accessed on foot. If you would prefer to stay at the motorcoach or decline to visit the site, simply speak to your tour manager to express concerns to create a solution that works for everyone. Note the level of physical demands on each tour page by looking for the yellow “Moderate” logo or the red “Challenging” logo. If neither of those logos can be found, the tour is assumed “easy” and accessible to all passengers except those with extremely limiting physical or health related conditions.'
    }, {
      title: 'Documentation',
      // tslint:disable-next-line:max-line-length
      description: '<b>Do I need a Passport?</b> Government-issued identification is essential for air travel. In addition, a valid passport is required for all trips outside Canada. Collins Tours will advise passengers of special entry requirements for relevant countries. We recommend that your passport has seven months validity. Passports/visas are the responsibility of each client.'
    }, {
      title: 'Extending Your Stay',
      // tslint:disable-next-line:max-line-length
      description: '<b>Can I extend my tour?</b> Yes! You can enhance your tour experience by purchasing extensions on select tours. Collins Tours offers pre/post hotel nights prior to and/or after a tour for you to experience a destination independently. Tour managers will not be available during extensions.'
    }, {
      title: 'Extras',
      // tslint:disable-next-line:max-line-length
      description: '<b>What is not included in the tour price?</b> The tour price does not include air travel, transfers, visas, customary end-of-trip gratuities for your tour manager, driver, local guides, hotel housekeepers, and any incidental charges. *Please Note: Collins Tours Inclusive Air pricing is available for each applicable tour – this package includes all air travel costs and in-destination transfers.'
    }, {
      title: 'Late Tour Bookings/Reservations',
      // tslint:disable-next-line:max-line-length
      description: '<b>How late can I book a tour?</b> Tour sales typically close 7 days prior to departure. All late bookings are request-based.'
    }, {
      title: 'Meeting My Tour Manager',
      // tslint:disable-next-line:max-line-length
      description: '<b>Where and when do I meet my Tour Manager?</b> On some of our motorcoach tours, your tour manager will greet you when you board the bus, however in many circumstances, the tour manager will be picked up at a location different to your own. In this case, the bus driver will assist with luggage and help you to a suitable seat. On tours that require air travel, your tour manager may meet you in the final destination airport or while traveling. When meeting in the destination, your tour manager or representative will meet you at the luggage claim for your private hotel transfer. For those who arrange their own airfare, hotel address, phone number and additional contact information will be included in your tour documentation package and you are required to arrange your own transportation from the airport.'
    }, {
      title: 'Tour Alterations & Revisions',
      // tslint:disable-next-line:max-line-length
      description: '<b>Could tour dates change?</b> While infrequent, Collins Tours does reserve the right to cancel a tour prior to departure. In this instance, Collins Tours will gladly refund all deposits and monies paid in their entirety and offer alternative tour options. Airfare purchased through Collins Tours Inclusive Air is protected and will be refunded in full. We cannot be held responsible for penalties incurred for air arranged separately.'
    }
  ];

  ngOnInit() {
  }

}
