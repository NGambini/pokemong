import { Component } from '@angular/core';
import { TwitterSearchService } from './core/services/twitter-search.service';

@Component({
  selector: 'pkm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private twitterSearchService: TwitterSearchService) {
    this.twitterSearchService.authorize();
  }
}
