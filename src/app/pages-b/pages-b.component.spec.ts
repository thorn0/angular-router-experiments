import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesBComponent } from './pages-b.component';

describe('PagesBComponent', () => {
  let component: PagesBComponent;
  let fixture: ComponentFixture<PagesBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
