import { Injectable } from '@angular/core';
import { Vendor } from '../_models/vendor';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ErrorService } from './error.service';
//import { Http } from '@angular/http';
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
export class VendorService {
  private apiURL = environment.baseAPIUrl + '/vendors/';

  constructor(private http: HttpClient, private httpclient: HttpClient, private errorService: ErrorService) { }

  get(name: string): Observable<Vendor> {
    return this.http
      .get(this.apiURL + name)
        .map(res => JSON.parse( JSON.stringify(res)));
  }

  getList(): Observable<Vendor[]> {
    const addSpecificFields = '?fields=name,typeName';
    return this.http
      .get(this.apiURL + addSpecificFields)
        .map(res => JSON.parse( JSON.stringify(res)));
  }

  getListByType(productTypeName: string): Observable<Vendor[]> {
    const addSpecificFields = '?fields=name&typeName=' + productTypeName;
    return this.http
      .get(this.apiURL + addSpecificFields)
        .map(res => JSON.parse( JSON.stringify(res)));
  }

  save(obj: Vendor): Observable<Vendor> {
    if (obj.id != null && obj.id > 0) {
      return this.httpclient.put<Vendor>(this.apiURL + obj.id + '/', obj, httpOptions)
      .pipe(
        catchError(this.errorService.handleError)
      );
    }

    return this.httpclient.post<Vendor>(this.apiURL, obj, httpOptions)
      .pipe(
        catchError(this.errorService.handleError)
      );
  }

  delete(id: number): Observable<any> {
    return this.httpclient.delete(this.apiURL + id, httpOptions)
    .pipe(
      catchError(this.errorService.handleError)
    );
  }
}
