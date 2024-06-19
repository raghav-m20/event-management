import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loaderService.hide();
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.loaderService.hide();
        return throwError(error);
      }),
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
