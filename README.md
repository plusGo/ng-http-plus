# ng-http-plus

> a better way to build a Http Request. 'ng-http-plus`

===============================

Thanks [NG-ZORRO/rebirth-http](https://github.com/NG-ZORRO/rebirth-http) given us the inspiration.

## Install
```bash
npm install ng-http-plus --save
```

## How to use?

### Register `HttpClientPlusModule`

```typescript
    import { HttpClientPlusModule } from 'ng-http-plus';
    
    @NgModule({
      imports: [
        BrowserModule,
        HttpClientPlusModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        ...ENV_PROVIDERS,
        ...APP_PROVIDERS
      ],
      bootstrap: [
        AppComponent
      ]
    })
    export class AppModule {
    }


```
   
### ng-http-plus service

```typescript
    import {HttpPlusClient} from 'ng-http-plus';
    import { Observable } from 'rxjs/Observable';
    import { HttpClient } from '@angular/common/http';

    @Injectable()
    export class ArticleService {
      
      getArticles(pageIndex = 1,pageSize = 10): Observable<SearchResult<Article>> {
        return HttpPlusClient.builder() // u can only use builder();
              .url('article')
              .param('pageIndex', pageIndex)
              .param('pageSize', pageSize)
              .get<SearchResult<Article>>();
      }
    
      getArticleByUrl(articleUrl: string): Observable<Article> {
        return  builder() 
                  .url(`article/${articleUrl}`)
                  .get<Article>();
      }
      
      createArticle( article: Article): Observable<void> {
        return  builder() 
                  .url(`article`)
                  .body(article)
                  .post<void>();
      }
      
      updateArticle( id: string,  article: Article): Observable<Article> {
        return  builder() 
                .url(`article/${id}`)
                .body(article)
                .put<Article>();
      }
      
      deleteArticleById(id: string): Observable<Article> {
        return  builder() 
                  .url(`article/${id}`)
                  .delete<Article>(); 
      }
      
      upload(formData:FormData) : Observable<any> {
        return  builder() 
                  .url('file/upload')
                  .body(formData)
                  .post<any>(); 
      }
    }
```

### Global interceptors

```typescript
    import {HttpPlusConfig} from 'ng-http-plus';
    
    @Component({
      selector: 'app',
      pipes: [],
      providers: [],
      directives: [],
      styles: [
        require('./app.scss')
      ],
      template: '<router-outlet></router-outlet>'
    })
    export class AppComponent {
    
      constructor() {
        HttpPlusConfig.builder()
             .baseUrl('https://cnodejs.org/api/v1')
             .addInterceptor({
               request: (req) => {
                 console.log('请求' + req);
               },
               response: (res) => {
                 console.log('回复' + res);
               }
             });
      }
    }
```   

## API Docs

### HttpPlusConfig

#### Methods:
- `builder(): HttpPlusConfig`: returns a new instance
- `baseUrl(baseUrl: string, excludes: RegExp[] = []): HttpPlusConfig`: set the base url of HnHttp
- `addInterceptor(interceptor: HnHttpInterceptor): HttpPlusConfig`: set the global interceptors of HnHttp


### HttpPlusClient

#### Methods:
- `url(url: string): HttpPlusClient`
- `extra(extra: string): HttpPlusClient`
- `body(body: any): HttpPlusClient`
- `header(key: string, value: any): HttpPlusClient`
- `headers(headers: HttpHeaders | { [p: string]: string | string[] }): HttpPlusClient`
- `observe(observe: HnHttpObserve): HttpPlusClient`
- `params(params: HttpParams | { [p: string]: string | string[] }): HttpPlusClient`
- `param(key: string, value: string | string[]): HttpPlusClient`
- `reportProgress(reportProgress: boolean): HttpPlusClient`
- `responseType(responseType: HnHttpResponseType): HttpPlusClient`
- `withCredentials(withCredentials: boolean): HttpPlusClient`
- `delete<T>(): Observable<T>`
- `get<T>(): Observable<T>`
- `post<T>(): Observable<T>`
- `method<T>(method: HnHttpMethod): Observable<T>`
- `put<T>(): Observable<T>`
