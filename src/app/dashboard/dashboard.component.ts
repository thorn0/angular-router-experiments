import { Component, OnInit, OnDestroy } from '@angular/core';
import { dbg } from '../utils';

let counter = 0;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  id = counter++;

  ngOnInit() {
    dbg('ngOnInit ' + this.constructor.name);
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
