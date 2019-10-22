import { UpcomingEventCity, UpcomingEventProvince } from './../../../../_models/upcomingEvent';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrls: ['./upcoming-events.component.less']
})
export class UpcomingEventsComponent implements OnInit {

  events: UpcomingEventProvince[];

  constructor() { }

  ngOnInit() {
    this.events = [];
    const nsCities = [];
    nsCities.push(new UpcomingEventCity(
      1,
      'Truro',
      'RSVP BY SEPTEMBER 16<br />Thursday, September 19th<br />11:30AM-1:30PM<br />Best Western Glengarry<br />150 Willow Street'
    ));
    this.events.push(new UpcomingEventProvince(
      1,
      'Nova Scotia',
      // tslint:disable-next-line:max-line-length
      'https://static.wixstatic.com/media/7348a4_33fcb4301b4e4e53b290f1cb10470a4d~mv2_d_5379_3054_s_4_2.jpg/v1/crop/x_546,y_0,w_3884,h_3045/fill/w_250,h_195,al_c,q_80,usm_0.33_1.00_0.00/Halifax.webp',
      nsCities
    ));


    const nbCities = [];
    nbCities.push(new UpcomingEventCity(
      2,
      'Moncton',
      // tslint:disable-next-line:max-line-length
      '11 Seats Left<br />RSVP BY OCTOBER 21<br />Wednesday, October 23rd <br />4:00PM-6:00PM<br />Crowne Plaza Moncton, Includes validated parking'
    ));
    nbCities.push(new UpcomingEventCity(
      3,
      'Charlottetown',
      '11 Seats Left<br />RSVP BY OCTOBER 21<br />Thursday, October 24th <br />11:00AM-1:00PM<br />Charlottetown Inn'
    ));
    nbCities.push(new UpcomingEventCity(
      4,
      'Fredericton',
      '6 Seats<br />RSVP BY OCTOBER 26<br />Tuesday, October 29th <br />4:00PM-6:00PM<br />Fredericton Inn'
    ));
    nbCities.push(new UpcomingEventCity(
      5,
      'Saint John',
      '14 Seats Left<br />RSVP BY OCTOBER 28<br />Wednesday, October 30th <br />4:00PM-6:00PM<br />Riverside Country Club'
    ));
    this.events.push(new UpcomingEventProvince(
      2,
      'New Brunswick/PEI',
      // tslint:disable-next-line:max-line-length
      'https://static.wixstatic.com/media/7348a4_6b3fa0f9cf4e4dbfb57c222eeee199a7~mv2_d_5476_3651_s_4_2.jpg/v1/crop/x_575,y_0,w_4146,h_3257/fill/w_241,h_196,al_c,q_80,usm_0.33_1.00_0.00/Uptown%2012_JPG.webp',
      nbCities
    ));

    const nfCities = [];
    nfCities.push(new UpcomingEventCity(
      6,
      'St. John\'s I',
      'RSVP BY OCTOBER 18<br />Monday, November 4th <br />5:00PM-7:00PM<br />Location TBA'
    ));
    nfCities.push(new UpcomingEventCity(
      7,
      'St. John\'s II',
      'Tuesday, November 5th <br />11:30AM-1:30AM<br />Location TBA'
    ));
    this.events.push(new UpcomingEventProvince(
      3,
      'Newfoundland',
      // tslint:disable-next-line:max-line-length
      'https://static.wixstatic.com/media/7348a4_33fcb4301b4e4e53b290f1cb10470a4d~mv2_d_5379_3054_s_4_2.jpg/v1/crop/x_546,y_0,w_3884,h_3045/fill/w_250,h_195,al_c,q_80,usm_0.33_1.00_0.00/Halifax.webp',
      nfCities
    ));
  }
}
