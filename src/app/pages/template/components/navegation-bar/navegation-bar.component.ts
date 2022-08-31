import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { filter, map, Observable, of, Subscription, tap } from 'rxjs';
import { Category } from 'src/app/shared/model/category.model';
import { OfferShort } from 'src/app/shared/model/offer.model';
import { CategoryServiceService } from 'src/app/shared/services/category-service.service';
import { OfferService } from 'src/app/shared/services/offer.service';
import { NavegationBarService } from './navegation-bar.service';

@Component({
  selector: 'app-navegation-bar',
  templateUrl: './navegation-bar.component.html',
  styleUrls: ['./navegation-bar.component.scss'],
})
export class NavegationBarComponent implements OnInit, OnDestroy {

  @Output() selectCategory: EventEmitter<Category> = new EventEmitter<Category>();

  categories: NbMenuItem[] = [
    {
      title: 'Carregando...',
    },
  ];

  searchValue: string = '';

  unsubSearch!: Subscription;

  filteredOptions$: Observable<OfferShort[]> = of([]);

  private readonly categoryTag = 'category-context-menu';

  constructor(
    private offerService: OfferService,
    private categoryService: CategoryServiceService,
    private nbMenuService: NbMenuService,
    private navegationBarService: NavegationBarService
  ) {}

  ngOnInit(): void {
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === this.categoryTag),
        map(({ item: { data } }) => data)
      )
      .subscribe((data) => this.selectCategory.emit(data));

    this.categoryService.categories$.subscribe(result => {
      const categories = result.map((category) => {
        return { title: category.name, data: category };
      });

      this.categories = categories;
    });
  }

  search(event:any) {
    if (event.target.value.length < 3) {
      this.filteredOptions$ = of([]);
      if(!!this.navegationBarService.searchTerm$.value
        && this.navegationBarService.searchTerm$.value !== event.target.value){
        this.navegationBarService.setSearchTerm('');
      }
      return;
    };

    this.filteredOptions$ = this.offerService.search(event.target.value).pipe(
      tap(_ => event.target.click()),
      map(({result}) => result)
    );
  }

  getOffers(): void {
    this.navegationBarService.setSearchTerm(this.searchValue);
  }

  clearSearch(): void {
    this.filteredOptions$ = of([]);
    this.searchValue = '';
    this.navegationBarService.setSearchTerm('');
  }

  onSelectionChange(term:string) {
    this.navegationBarService.setSearchTerm(term);
  }

  ngOnDestroy(): void {
    this.unsubSearch.unsubscribe();
  }
}
