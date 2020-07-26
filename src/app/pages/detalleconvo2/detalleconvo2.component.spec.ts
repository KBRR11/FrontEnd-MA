import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Detalleconvo2Component } from './detalleconvo2.component';

describe('Detalleconvo2Component', () => {
  let component: Detalleconvo2Component;
  let fixture: ComponentFixture<Detalleconvo2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Detalleconvo2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Detalleconvo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
