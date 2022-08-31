import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/shared/model/category.model';
import { OfferFilter } from 'src/app/shared/model/offer.model';
import { CategoryServiceService } from 'src/app/shared/services/category-service.service';

@Component({
  selector: 'app-adverts-filter',
  templateUrl: './adverts-filter.component.html',
  styleUrls: ['./adverts-filter.component.scss']
})
export class AdvertsFilterComponent implements OnInit {

  filter: OfferFilter = {
    categories: [],
    rate: 0,
  };

  @Output()
  changeFilter: EventEmitter<OfferFilter> = new EventEmitter<OfferFilter>();

  categories: Observable<Category[]> = this.categoryService.categories$.pipe(
    map((categories) => categories.slice(0, 5))
  );

  constructor(
    private categoryService: CategoryServiceService
  ) {}

  ngOnInit(): void {
  }

  changePrices(): void {
    this.changeFilter.emit(this.filter);
  }

  changeRate(): void {
    this.changeFilter.emit(this.filter);
  }

  changeCategory(category: Category, selected: boolean): void {

    if (selected) {
      this.filter?.categories?.push(category);
    } else {
      this.filter?.categories?.splice(this.filter?.categories?.indexOf(category), 1);
    }

    this.changeFilter.emit(this.filter);
  }

}
