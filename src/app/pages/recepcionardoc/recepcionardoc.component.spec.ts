import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionardocComponent } from './recepcionardoc.component';

describe('RecepcionardocComponent', () => {
  let component: RecepcionardocComponent;
  let fixture: ComponentFixture<RecepcionardocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionardocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionardocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
