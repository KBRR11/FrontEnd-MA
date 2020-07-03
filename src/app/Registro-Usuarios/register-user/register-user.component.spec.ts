import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUSERComponent } from './register-user.component';

describe('RegisterUSERComponent', () => {
  let component: RegisterUSERComponent;
  let fixture: ComponentFixture<RegisterUSERComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterUSERComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterUSERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
