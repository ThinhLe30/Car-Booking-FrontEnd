import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InfoComponent } from './info/info.component';
import { SliderComponent } from './slider/slider.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
import { WhyComponent } from './why/why.component';
import { MainComponent } from './main/main.component';
import {HttpClientModule} from '@angular/common/http';
import { BookingComponent } from './booking/booking.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { ProcessingBookingComponent } from './processing-booking/processing-booking.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingListUpdateComponent } from './booking-list-update/booking-list-update.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { DriverListComponent } from './drivers/driver-list/driver-list.component';
import { DriverFormComponent } from './drivers/driver-form/driver-form.component';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InfoComponent,
    SliderComponent,
    AboutComponent,
    ServiceComponent,
    ContactComponent,
    WhyComponent,
    MainComponent,
    BookingComponent,
    ProcessingBookingComponent,
    BookingListComponent,
    BookingListUpdateComponent,
    BookingDetailComponent,
    DriverListComponent,
    DriverFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
