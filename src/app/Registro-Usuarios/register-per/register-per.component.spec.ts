import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPerComponent } from './register-per.component';

describe('RegisterPerComponent', () => {
  let component: RegisterPerComponent;
  let fixture: ComponentFixture<RegisterPerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
