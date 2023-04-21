import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
import { ProcessingBookingComponent } from './processing-booking/processing-booking.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingListUpdateComponent } from './booking-list-update/booking-list-update.component';
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { DriverListComponent } from './drivers/driver-list/driver-list.component';

const routes: Routes = [
  {
    path : '', redirectTo : "home", pathMatch :"full"
  },
  {
    path : 'home', component : MainComponent
  },
  {
    path : 'about', component : AboutComponent
  },
  {
    path : 'service', component : ServiceComponent
  },
  {
    path : 'contact', component : ContactComponent
  },
  {
    path : 'confirm-info-booking', component : ProcessingBookingComponent
  },
  {
    path : 'books', component : BookingListComponent
  },
  {
    path : 'books/:id', component : BookingListUpdateComponent
  },
  {
    path : 'books/:id/view', component : BookingDetailComponent
  }
  // {
  //   path : 'driver-list', component : DriverListComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
