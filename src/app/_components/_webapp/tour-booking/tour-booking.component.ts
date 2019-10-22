import { PurchaseService } from './../../../_services/purchase.service';
import { EnumsHelper } from './../../../_helpers/enums.helper';
import { UIHelper } from './../../../_helpers/ui.helper';
import { Component, OnInit } from '@angular/core';
import { GrandService } from 'src/app/_models/grandService';
import { GrandServicesService } from 'src/app/_services/grandServices.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentStepService } from 'src/app/_services/paymentStep.service';
import { PaymentStep } from 'src/app/_models/paymentStep';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { PaypalHelper } from 'src/app/_helpers/paypal.helper';


@Component({
  selector: 'app-tour-booking',
  templateUrl: './tour-booking.component.html',
  styleUrls: ['./tour-booking.component.less']
})

export class TourBookingComponent implements OnInit {

  countryType = '0';
  cardType = '0';
  month1 = '0';
  month2 = '0';

  grandService: GrandService;
  pricePreTax = 0;
  tax = 0;
  depositWithTax = 0;
  paymentSteps: PaymentStep[];

  form: FormGroup;
  formErrors: string[];

  totalPeople: number;

  public payPalConfig?: IPayPalConfig;
  showSuccess = false;

  public lastMinuteTours: GrandService[];

  taxRates: Map<string, number>;
  originalPrice: number;

  constructor(private grandServicesService: GrandServicesService, private uiHelper: UIHelper, private formBuilder: FormBuilder,
              private route: ActivatedRoute, private enumsHelper: EnumsHelper, private paymentStepService: PaymentStepService,
              private paypalHelper: PaypalHelper, private purchaseService: PurchaseService) { }

  ngOnInit() {
    this.formErrors = this.lastMinuteTours = [];

    this.route.params.subscribe(params => {
      const grandServiceName = params.tourName;
      this.totalPeople = params.totalPeople;

      this.createFormGroup();

      this.paymentSteps = new Array<PaymentStep>();

      this.taxRates = this.enumsHelper.TaxRates;

      this.grandServicesService.get(grandServiceName)
          .subscribe((data) => {
            this.grandService = data;

            let deposit = 0;

            const taxPrecentage = Number(this.taxRates.get(this.grandService.taxCode)) + 1;

            this.paymentStepService.getList(data.id)
            .subscribe((dataSteps) => {
              this.paymentSteps = dataSteps;
              const depositObject = this.paymentSteps.filter((p) => {
                return p.type === 'Deposit';
              });

              if (depositObject !== null && depositObject.length === 1) {
                deposit = depositObject[0].amount;
              } else {
                deposit = 1500;
              }

              this.depositWithTax = (deposit * taxPrecentage * this.totalPeople);
            });

            const priceDetails = this.grandService.pricing.filter((p) => {
              return p.roomOccupancy === Number(this.totalPeople);
            })[0];

            this.pricePreTax = priceDetails.discountPrice * this.totalPeople;

            this.originalPrice = ((priceDetails.regPrice * this.totalPeople) * taxPrecentage);

            this.tax = (this.pricePreTax * (taxPrecentage - 1));


            setTimeout(() => {
              this.uiHelper.scrollToTop();
            }, 100);
        });
    });
  }

  createFormGroup() {
    this.form = this.formBuilder.group({
      people: this.formBuilder.array([])
    });

    const control = this.form.controls.people as FormArray;
    for (let index = 0; index < this.totalPeople; index++) {
      control.push(this.formBuilder.group({
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      }));
    }
  }

  public submitOrder() {
    const people: any[] = this.form.value.people as any[];

    // tslint:disable-next-line:forin
    for (let i in people) {
      const p = people[i];

      if (p.firstName.length === 0) {
        alert('Please fill in First Name');
        return false;
      }
      if (p.lastName.length === 0) {
        alert('Please fill in Last Name');
        return false;
      }
      if (p.email.indexOf('@') === -1) {
        alert('Please fill in Email');
        return false;
      }
      if (p.phone.length !== 10) {
        alert('Please fill in 10 digit phone number');
        return false;
      }
    }

    const img = (document.querySelector('#imgLoad') as HTMLElement);
    img.classList.remove('hide');

    const body = (document.querySelector('.placetop.mar-top') as HTMLElement);
    body.classList.add('hide');

    this.purchaseService.purchase(people, this.grandService.id).subscribe((customerGrandService) => {
      this.purchaseService.createPayPalOrder(Number(customerGrandService.id)).subscribe((res2) => {

        window.location.href = res2.orderUrl;
      });
    });
  }
}
