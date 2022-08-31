import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NbMenuItem, NbMenuService, NbSearchService } from '@nebular/theme';
import { filter, map, Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/shared/model/category.model';
import { CategoryServiceService } from 'src/app/shared/services/category-service.service';

@Component({
  selector: 'app-navegation-bar',
  templateUrl: './navegation-bar.component.html',
  styleUrls: ['./navegation-bar.component.scss'],
})
export class NavegationBarComponent implements OnInit, OnDestroy {

  categories: NbMenuItem[] = [
    {
      title: 'Carregando...',
    },
  ];

  searchValue = '';

  unsubSearch!: Subscription;

  searchTerm$: Observable<any> = this.searchService.onSearchSubmit();

  @Output() selectCategory: EventEmitter<Category> =
    new EventEmitter<Category>();

  @Output() searchTerm: EventEmitter<string> = new EventEmitter<string>();

  private readonly categoryTag = 'category-context-menu';

  constructor(
    private categoryService: CategoryServiceService,
    private nbMenuService: NbMenuService,
    private searchService: NbSearchService,
    private cb: ChangeDetectorRef
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

  openSearch() {
    this.searchService.activateSearch('rotate-layout');
  }

  ngOnDestroy(): void {
    this.unsubSearch.unsubscribe();
  }
}
