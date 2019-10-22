import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ErrorService } from './error.service';
import { environment } from 'src/environments/environment';
import { Lead } from '../_models/lead';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private apiURL = environment.baseAPIUrl + '/contact/';

  constructor(private httpclient: HttpClient, private errorService: ErrorService) { }

  save(obj: Lead): Observable<Lead> {
    return this.httpclient.post<Lead>(this.apiURL, obj, httpOptions)
      .pipe(
        catchError(this.errorService.handleError)
      );
  }
}
