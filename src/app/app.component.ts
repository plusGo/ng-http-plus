import {Component} from '@angular/core';
import {TopicClient} from './core/api/topic.client';
import {HttpPlusConfig} from "../../projects/ng-http-plus-lib/src/lib/config/http-plus.config";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-cnode';


  constructor(private topicClient: TopicClient) {


    HttpPlusConfig.builder()
      .baseUrl('https://cnodejs.org/api/v1')
      .addInterceptor({
        request: (req) => {
          return req;
        }
      });


    topicClient.getTopics(1, '', 20).subscribe(res => {
      debugger;
    });
  }
}
