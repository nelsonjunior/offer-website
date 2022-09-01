import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOfferDetailComponent } from './card-offer-detail.component';

describe('CardOfferDetailComponent', () => {
  let component: CardOfferDetailComponent;
  let fixture: ComponentFixture<CardOfferDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardOfferDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
