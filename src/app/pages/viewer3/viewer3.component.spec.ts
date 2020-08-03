import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Viewer3Component } from './viewer3.component';

describe('Viewer3Component', () => {
  let component: Viewer3Component;
  let fixture: ComponentFixture<Viewer3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Viewer3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Viewer3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
