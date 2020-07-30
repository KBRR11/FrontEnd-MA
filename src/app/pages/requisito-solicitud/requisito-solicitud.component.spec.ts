import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitoSolicitudComponent } from './requisito-solicitud.component';

describe('RequisitoSolicitudComponent', () => {
  let component: RequisitoSolicitudComponent;
  let fixture: ComponentFixture<RequisitoSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitoSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
