import { TestBed } from '@angular/core/testing';

import { DetailOfferResolver } from './detail-offer.resolver';

describe('DetailOfferResolver', () => {
  let resolver: DetailOfferResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailOfferResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
