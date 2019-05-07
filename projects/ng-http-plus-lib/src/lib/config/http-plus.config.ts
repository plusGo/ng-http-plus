import {HttpPlusInterceptor} from '../model/interceptor.model';
import {HttpRequest} from '@angular/common/http';
import {HttpPlusConstants} from '../model/constants.model';

export class HttpPlusConfig {

  public static builder(): HttpPlusConfig {
    return new HttpPlusConfig();
  }

  public baseUrl(baseUrl: string, excludes: RegExp[] = []): HttpPlusConfig {
    HttpPlusConstants.GLOBAL_BASE_URL = baseUrl;
    HttpPlusConstants.INTERCEPTORS.push({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        if (/^https?:/.test(request.url)) {
          return request;
        }

        const excludeUrl = excludes.some(t => t.test(request.url));
        if (excludeUrl) {
          return request;
        }

        baseUrl = baseUrl.replace(/\/$/, '');
        const url = request.url.replace(/^\//, '');
        return request.clone({url: `${baseUrl}/${url}`});
      }
    });

    return this;
  }

  public addInterceptor(interceptor: HttpPlusInterceptor): HttpPlusConfig {
    HttpPlusConstants.INTERCEPTORS.push(interceptor);
    return this;
  }

  public addRequestInterceptor(reqInterceptor: (req) => any): HttpPlusConfig {
    this.addInterceptor({request: reqInterceptor});
    return this;
  }

  public addResponseInterceptor(resInterceptor: (res) => any): HttpPlusConfig {
    this.addInterceptor({response: resInterceptor});
    return this;
  }

}
