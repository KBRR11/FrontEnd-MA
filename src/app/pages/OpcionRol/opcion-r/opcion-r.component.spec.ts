import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionRComponent } from './opcion-r.component';

describe('OpcionRComponent', () => {
  let component: OpcionRComponent;
  let fixture: ComponentFixture<OpcionRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
