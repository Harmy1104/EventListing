import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
// import { NavigationComponent } from './navigation/navigation.component';
import { EventListingComponent } from './event-listing/event-listing.component'

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: ':etype',
    component: EventListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
