import { Injectable } from '@angular/core';

@Injectable()
export class UrlHelperService {
  public getIdFromUrl(url: string) {
    const splitted = url.split('/');
    let last = '';
    while (last === '') {
      last = splitted.pop();
    }
    return parseInt(last, 10);
  }
}
