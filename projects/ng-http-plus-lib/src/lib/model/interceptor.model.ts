import {HttpErrorResponse, HttpEvent, HttpRequest} from '@angular/common/http';

export interface HttpPlusInterceptor {
  request?: (option: HttpRequest<any>) => HttpRequest<any> | void;
  response?: (response: HttpEvent<any> | HttpErrorResponse, request?: HttpRequest<any>) => HttpEvent<any> | void;
}
