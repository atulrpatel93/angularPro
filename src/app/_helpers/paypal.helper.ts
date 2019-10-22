import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PaypalHelper {
  currency = 'CAD';
  Intent = 'CAPTURE';
  ClientId = 'sb';
}
