import {HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpPlusConstants} from '../model/constants.model';
import {HttpExtra, HttpMethod, HttpObserve, HttpResponseType} from '../model/enums.model';
import {Observable} from 'rxjs';
import {Compare, Optional} from "stream-plus";

export const hasExtra = (req: HttpRequest<any>, extraName: string) => {
  return req.params.has(HttpExtra.EXTRA as any) && req.params.get(HttpExtra.EXTRA as any) === extraName;
};

export const httpPlus = (): HttpPlusClient => new HttpPlusClient();

@Injectable({
  providedIn: 'root'
})
export class HttpPlusClient {
  private httpPlusMethod: HttpMethod;
  private httpPlusUrl: string;
  private httpPlusExtra: string;
  private httpPlusBaseUrl: string;

  public options: {
    body?: any;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: HttpObserve;
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType: HttpResponseType;
    withCredentials?: boolean;
  } = {} as any;

  public static builder(): HttpPlusClient {
    return new HttpPlusClient();
  }

  public constructor() {
  }

  baseUrl(baseUrl: string): HttpPlusClient {
    this.httpPlusBaseUrl = baseUrl;
    return this;
  }

  url(url: string): HttpPlusClient {
    this.httpPlusUrl = url;
    return this;
  }

  extra(extra: string): HttpPlusClient {
    this.httpPlusExtra = extra;
    return this;
  }

  body(body: any): HttpPlusClient {
    this.options.body = body;
    return this;
  }

  header(key: string, value: any): HttpPlusClient {
    (this.options.headers as HttpHeaders).set(key, value);
    return this;
  }

  headers(headers: HttpHeaders | { [p: string]: string | string[] }): HttpPlusClient {
    this.options.headers = headers;
    return this;
  }

  observe(observe: HttpObserve): HttpPlusClient {
    this.options.observe = observe;
    return this;
  }

  params(params: HttpParams | { [p: string]: string | string[] }): HttpPlusClient {
    this.options.params = params;
    return this;
  }

  param(key: string, value: string | string[]): HttpPlusClient {
    this.options.params = this.options.params || {};
    this.options.params[key] = value;
    return this;
  }

  reportProgress(reportProgress: boolean): HttpPlusClient {
    this.options.reportProgress = reportProgress;
    return this;
  }

  responseType(responseType: HttpResponseType): HttpPlusClient {
    this.options.responseType = responseType;
    return this;
  }

  withCredentials(withCredentials: boolean): HttpPlusClient {
    this.options.withCredentials = withCredentials;
    return this;
  }

  delete<T>(): Observable<T> {
    return this.method(HttpMethod.DELETED);
  }

  get<T>(): Observable<T> {
    return this.method(HttpMethod.GET);
  }

  method<T>(method: HttpMethod): Observable<T> {
    this.httpPlusMethod = method;
    if (Compare.isNullOrUndefined(HttpPlusConstants.CLIENT)) {
      throw new Error('HttpPlusModule is not imported!');
    }
    if (Compare.isNullOrUndefined(this.httpPlusMethod)) {
      throw new Error('HttpPlusClient should request with method');
    }

    if (Compare.isNullOrUndefined(this.httpPlusUrl)) {
      throw new Error('HttpPlusClient should request with url');
    }

    Optional.ofNullable(this.httpPlusExtra)
      .ifPresent(extra => {
        this.options.params = this.options.params || {};
        this.options.params['extra'] = extra;
      });

    return HttpPlusConstants.CLIENT.request<T>(this.httpPlusMethod, `${this.httpPlusBaseUrl}${this.httpPlusUrl}`, this.options as any) as any;
  }

  post<T>(): Observable<T> {
    return this.method(HttpMethod.POST);
  }

  put<T>(): Observable<T> {
    return this.method(HttpMethod.PUT);
  }


}
