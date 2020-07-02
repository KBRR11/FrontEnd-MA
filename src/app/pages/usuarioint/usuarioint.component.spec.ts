import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariointComponent } from './usuarioint.component';

describe('UsuariointComponent', () => {
  let component: UsuariointComponent;
  let fixture: ComponentFixture<UsuariointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
