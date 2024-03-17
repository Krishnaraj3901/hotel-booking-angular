import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RoomPageComponent } from './room-page/room-page.component';
import { BookingComponent } from './booking/booking.component';
import { HistoryComponent } from './history/history.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'home',component: MainComponent
  },
  {
    path:'rooms',component:RoomPageComponent
  },
  {
    path:'booking/:roomId',component:BookingComponent
  },
  {
    path:'history/:phno',component:HistoryComponent
  },
  {
    path:'contact',component:ContactComponent
  },
  {
    path:'checkout/:checkin/:roomId',component:CheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
