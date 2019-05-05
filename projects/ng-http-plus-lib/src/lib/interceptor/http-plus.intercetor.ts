import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {HttpPlusConstants} from '../model/constants.model';
import {Optional} from "stream-plus";
import {HttpExtra} from "../model/enums.model";

@Injectable()
export class HttpPlusInterceptors implements HttpInterceptor {

  constructor() {
  }

  handleRequest(req: HttpRequest<any>): HttpRequest<any> | void {
    Optional.ofNullable(req)
      .map(req => req.params)
      .map(params => params.get(HttpExtra.EXTRA))
      .ifPresent(value => {
        req = req.clone({
          params: req.params.delete(HttpExtra.EXTRA)
        })
      });

    HttpPlusConstants.INTERCEPTORS
      .filter(item => !!item.request)
      .reduce((httpEvent, item) => {
        return (item.request(httpEvent) || httpEvent);
      }, req);
  }

  getHandleResponse(): any {
    return (res, req) => {
      this.handleResponse(res, req);
    };
  }

  handleResponse(response: HttpEvent<any>, request?: HttpRequest<any>): HttpEvent<any> | void {
    return HttpPlusConstants.INTERCEPTORS
      .filter(item => !!item.response)
      .reverse()
      .reduce((httpEvent, item) => {
        return item.response(httpEvent, request) || httpEvent;
      }, response);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent
    | HttpResponse<any> | HttpUserEvent<any>> {
    const httpRequest = this.handleRequest(req) as any;
    return next.handle(httpRequest)
      .pipe(map(response => {
          if ([HttpEventType.Response, HttpEventType.ResponseHeader].indexOf(response.type) !== -1) {
            return (this.getHandleResponse()(response, httpRequest) || response);
          }
          return response;
        }),
        catchError(error => throwError(this.handleResponse(error, httpRequest) || error))
      );
  }
}
