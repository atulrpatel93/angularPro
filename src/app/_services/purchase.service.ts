import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Payment } from '../_models/payment';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class PurchaseService {
  constructor(private httpclient: HttpClient, private errorService: ErrorService) { }

  public purchase(obj: any, grandServiceId: number): Observable<any> {
    const apiUrl = environment.baseAPIUrl + '/purchasetour/';
    return this.httpclient.post<Payment>(apiUrl + grandServiceId, obj, httpOptions)
      .pipe(
        catchError(this.errorService.handleError)
      );
  }

  public createPayPalOrder(customerGrandServiceId: number): Observable<any> {
    const apiUrl = environment.baseAPIUrl + '/createPayPalOrder/';

    const obj = {
      customerGrandServiceId
    };

    return this.httpclient.post<any>(apiUrl, obj, httpOptions)
      .pipe(
        catchError(this.errorService.handleError)
      );
  }
}
