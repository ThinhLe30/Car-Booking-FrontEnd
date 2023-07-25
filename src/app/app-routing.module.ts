import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
