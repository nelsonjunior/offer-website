import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowDetailOfferComponent } from './window-detail-offer.component';

describe('WindowDetailOfferComponent', () => {
  let component: WindowDetailOfferComponent;
  let fixture: ComponentFixture<WindowDetailOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowDetailOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowDetailOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
