import { TestBed } from '@angular/core/testing';

import { NavegationBarService } from './navegation-bar.service';

describe('NavegationBarService', () => {
  let service: NavegationBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavegationBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
