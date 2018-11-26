import { Component, OnInit, OnDestroy } from '@angular/core';
import { dbg } from './utils';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

let counter = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'router-experiments';
  id = counter++;

  constructor(private router: Router) {}

  ngOnInit() {
    dbg('ngOnInit ' + this.constructor.name);
    this.router.events.subscribe(event => {
      if (
        event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        dbg(event.constructor.name, 'tomato');
      }
    });
  }

  ngOnDestroy() {
    dbg('ngOnDestroy ' + this.constructor.name);
  }

  ngOnAttach() {
    dbg('ngOnAttach ' + this.constructor.name);
  }

  ngOnDetach() {
    dbg('ngOnDetach ' + this.constructor.name);
  }
}
