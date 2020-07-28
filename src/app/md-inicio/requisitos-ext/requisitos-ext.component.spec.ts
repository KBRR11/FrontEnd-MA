import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitosExtComponent } from './requisitos-ext.component';

describe('RequisitosExtComponent', () => {
  let component: RequisitosExtComponent;
  let fixture: ComponentFixture<RequisitosExtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitosExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitosExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
