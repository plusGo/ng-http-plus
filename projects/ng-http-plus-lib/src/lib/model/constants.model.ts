import {HttpClient} from '@angular/common/http';
import {HttpPlusInterceptor} from './interceptor.model';

export class HttpPlusConstants {
  public static CLIENT: HttpClient = null;
  public static INTERCEPTORS: HttpPlusInterceptor[] = [];
  public static GLOBAL_BASE_URL = '';
}
