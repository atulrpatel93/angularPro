import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandServiceIncludesComponent } from './grand-service-includes.component';

describe('GrandServiceIncludesComponent', () => {
  let component: GrandServiceIncludesComponent;
  let fixture: ComponentFixture<GrandServiceIncludesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandServiceIncludesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandServiceIncludesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
