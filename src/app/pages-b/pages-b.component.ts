import { Component, OnInit, OnDestroy } from '@angular/core';
import { dbg } from '../utils';

let counter = 0;

@Component({
  selector: 'app-pages-b',
  templateUrl: './pages-b.component.html',
  styleUrls: ['./pages-b.component.css']
})
export class PagesBComponent implements OnInit, OnDestroy {
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
