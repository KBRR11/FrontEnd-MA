import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionardirectoraComponent } from './recepcionardirectora.component';

describe('RecepcionardirectoraComponent', () => {
  let component: RecepcionardirectoraComponent;
  let fixture: ComponentFixture<RecepcionardirectoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionardirectoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionardirectoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
