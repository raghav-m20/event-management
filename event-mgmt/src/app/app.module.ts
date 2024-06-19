import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EventListComponent } from './event-list/event-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DataService } from './helpers/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ConfirmDialogComponent } from './helpers/confirm-dialog/confirm-dialog.component';
import { LoaderComponent } from './helpers/loader/loader.component';
import { HttpRequestInterceptor } from './helpers/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventDetailsComponent,
    ConfirmDialogComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
