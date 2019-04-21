import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {catchError} from "rxjs/operators";
import {CookieService} from "ngx-cookie";

@Injectable()
export class CsrfTokenInterceptor implements HttpInterceptor {

  constructor(private cookie: CookieService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((requestError, retryRequest) => {
      if (!(requestError instanceof HttpErrorResponse && requestError.status == 403)) {
        return throwError(requestError);
      }

      let xsrfToken: string = this.cookie.get('XSRF-TOKEN');
      if (!xsrfToken) {
        return throwError(requestError);
      }

      return next.handle(req.clone({
        setHeaders: {
          "X-XSRF-TOKEN": xsrfToken
        }
      }));
    }));
  }
}
