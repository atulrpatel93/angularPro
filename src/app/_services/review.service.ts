import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Review } from '../_models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiURL = environment.baseAPIUrl + '/reviews/';

  constructor(private httpclient: HttpClient) { }

  getList(): Observable<Review[]> {
    return this.httpclient.get<Review[]>(this.apiURL);
  }
  getByGrandServiceId(grandServiceId: number): Observable<Review[]> {
    return this.httpclient.get<Review[]>(this.apiURL + '?grandServiceId=' + grandServiceId);
  }
}
