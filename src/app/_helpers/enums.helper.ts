import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class EnumsHelper {
  GrandServicesTags: string[] = ['Cruise', 'Canada', 'USA', 'Europe', 'South America', 'Asia'];
  GrandServicesFeaturedTags: string[] = ['Last Call', 'Featured', 'New Releases'];
  TaxRates: Map<string, number> =
    new Map([
        ['AB', 5],
        ['BC', 12],
        ['MB', 13],
        ['NB', 15],
        ['NL', 15],
        ['NT', 5],
        ['NS', 15],
        ['NU', 5],
        ['ON', 13],
        ['PE', 15],
        ['QC', 14.975],
        ['SK', 11],
        ['YT', 5],
        ['none', 0]
    ]);
}
