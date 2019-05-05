import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpPlusInterceptors} from '../interceptor/http-plus.intercetor';
import {HttpPlusConstants} from '../model/constants.model';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpPlusInterceptors,
      multi: true,
    }]
})
export class HttpClientPlusModule {

  constructor(private httpClient: HttpClient) {
    HttpPlusConstants.CLIENT = this.httpClient;
  }
}
