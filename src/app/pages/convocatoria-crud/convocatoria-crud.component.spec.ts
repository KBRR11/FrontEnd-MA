import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriaCRUDComponent } from './convocatoria-crud.component';

describe('ConvocatoriaCRUDComponent', () => {
  let component: ConvocatoriaCRUDComponent;
  let fixture: ComponentFixture<ConvocatoriaCRUDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvocatoriaCRUDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriaCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
