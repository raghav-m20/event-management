import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
  {
    path: '',
    component: EventListComponent
  },
  {
    path: 'event-details/:eventId',
    component: EventDetailsComponent
  },
  { path: 'event-details', component: EventDetailsComponent },
  { path: "**", redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
