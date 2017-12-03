import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TwitterSearchService {
  private headers: HttpHeaders;
  private authorized = false;

  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');
  }

  public authorize(): void {
    this.httpClient.post('http://localhost:3000/authorize', { headers: this.headers });
  }

  public getTweetsForTopic(topic: string, offset: string): Observable<any>  {
    let queryString = 'query=' + topic;
    if (offset) {
      queryString += '&max_id=' + offset;
    }
    return this.httpClient.post('http://localhost:3000/search', queryString, { headers: this.headers });
  }
}
