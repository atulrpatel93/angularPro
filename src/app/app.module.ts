
import { CustomersModule } from './_modules/customers.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarAdminComponent } from './_shared/_components/_admin/navbar/navbar-admin.component';
import { NavbarComponent } from './_shared/_components/_webapp/navbar/navbar.component';
import { LoginComponent } from './_components/_admin/login/login.component';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'ng4-social-login';
import { VendorsModule } from './_modules/vendors.module';
import { NgxPermissionsModule } from 'ngx-permissions';
//import { HttpModule } from '@angular/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GrandServicesModule } from './_modules/grand-services.module';
import { PaymentComponent } from './_components/_admin/payments/payment/payment.component';
import { ToastrModule } from 'ngx-toastr';
import { ReportsComponent } from './_components/_admin/reports/reports.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { HomeComponent } from './_components/_webapp/home/home.component';
import { FooterComponent } from './_shared/_components/_webapp/footer/footer.component';
import { TourBookingComponent } from './_components/_webapp/tour-booking/tour-booking.component';
import { TourDetailComponent } from './_components/_webapp/tour-detail/tour-detail.component';
import { TourGridComponent } from './_components/_webapp/tour-grid/tour-grid.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatVideoModule } from 'mat-video';
// tslint:disable-next-line:max-line-length
import { GrandServiceIncludesComponent } from './_components/_admin/grand-services/details/grand-service-includes/grand-service-includes.component';

import { NgxPayPalModule } from 'ngx-paypal';
import { UpcomingEventsComponent } from './_components/_webapp/menu-pages/upcoming-events/upcoming-events.component';
import { PoliciesComponent } from './_components/_webapp/menu-pages/policies/policies.component';
import { AboutUsComponent } from './_components/_webapp/menu-pages/about-us/about-us.component';
import { LoyaltyComponent } from './_components/_webapp/menu-pages/loyalty/loyalty.component';
import { StaffComponent } from './_components/_webapp/menu-pages/staff/staff.component';
import { FAQComponent } from './_components/_webapp/menu-pages/faq/faq.component';
import { ContactComponent } from './_components/_webapp/menu-pages/contact/contact.component';
import { ThankYouComponent } from './_components/_webapp/account/thank-you/thank-you.component';
import { AllToursComponent } from './_components/_webapp/escorted-travel/all-tours/all-tours.component';
import { PromotionsComponent } from './_components/_webapp/menu-pages/promotions/promotions.component';
import { LeadsComponent } from './_components/_admin/leads/leads.component';
import { DragDropModule  } from '@angular/cdk/drag-drop';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1091791913990-4segraml5e8t9gnr7g0ed2t25la9i48s.apps.googleusercontent.com')
  }
], false);

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1
};

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarAdminComponent,
    NavbarComponent,
    LoginComponent,
    PaymentComponent,
    ReportsComponent,
    HomeComponent,
    FooterComponent,
    TourBookingComponent,
    TourDetailComponent,
    TourGridComponent,
    GrandServiceIncludesComponent,
    UpcomingEventsComponent,
    PoliciesComponent,
    AboutUsComponent,
    LoyaltyComponent,
    StaffComponent,
    FAQComponent,
    ContactComponent,
    ThankYouComponent,
    AllToursComponent,
    PromotionsComponent,
    LeadsComponent
  ],
  imports: [
    SocialLoginModule,
    BrowserModule,
    AppRoutingModule,
    VendorsModule,
    GrandServicesModule,
    NgxPermissionsModule.forRoot(),
  //  HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CustomersModule,
    ToastrModule.forRoot(),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SlideshowModule,
    SwiperModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatVideoModule,
    NgxPayPalModule,
    DragDropModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
