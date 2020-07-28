import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarRequisitoComponent } from './validar-requisito.component';

describe('ValidarRequisitoComponent', () => {
  let component: ValidarRequisitoComponent;
  let fixture: ComponentFixture<ValidarRequisitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarRequisitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarRequisitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
