import { TestBed } from '@angular/core/testing';

import { RequisitoService } from './requisito.service';

describe('RequisitoService', () => {
  let service: RequisitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisitoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
