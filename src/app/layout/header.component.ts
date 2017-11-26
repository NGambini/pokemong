import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/state/app.state';
import { Subject } from 'rxjs';

import * as UserInterfaceActions from '../core/state/user-interface/user-interface.actions';


@Component({
  selector: 'pkm-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  private searchSubject: Subject<string> = new Subject();

  constructor(private store: Store<AppState>) {
    this.searchSubject.debounceTime(350).subscribe(searchValue => this.searchHandler(searchValue));
  }

  private searchHandler(string: string) {
    this.store.dispatch(new UserInterfaceActions.SetSearch({ search: string }));
  }

  public onInput(inputEvent: Event) {
    this.searchSubject.next(inputEvent.target['value']);
  }
}
