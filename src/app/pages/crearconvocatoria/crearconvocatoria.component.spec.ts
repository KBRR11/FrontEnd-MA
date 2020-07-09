import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearconvocatoriaComponent } from './crearconvocatoria.component';

describe('CrearconvocatoriaComponent', () => {
  let component: CrearconvocatoriaComponent;
  let fixture: ComponentFixture<CrearconvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearconvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearconvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
