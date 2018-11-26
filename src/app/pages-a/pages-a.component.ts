import { Component, OnInit, OnDestroy } from '@angular/core';
import { dbg } from '../utils';

let counter = 0;

@Component({
  selector: 'app-pages-a',
  templateUrl: './pages-a.component.html',
  styleUrls: ['./pages-a.component.css']
})
export class PagesAComponent implements OnInit, OnDestroy {
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
