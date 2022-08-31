import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersTitleComponent } from './offers-title.component';

describe('OffersTitleComponent', () => {
  let component: OffersTitleComponent;
  let fixture: ComponentFixture<OffersTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffersTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
