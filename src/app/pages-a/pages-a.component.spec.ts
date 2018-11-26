import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesAComponent } from './pages-a.component';

describe('PagesAComponent', () => {
  let component: PagesAComponent;
  let fixture: ComponentFixture<PagesAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
