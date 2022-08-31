import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertsFilterComponent } from './adverts-filter.component';

describe('AdvertsFilterComponent', () => {
  let component: AdvertsFilterComponent;
  let fixture: ComponentFixture<AdvertsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
