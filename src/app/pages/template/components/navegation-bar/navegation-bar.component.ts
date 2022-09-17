import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NbLayoutScrollService, NbMenuItem, NbMenuService } from '@nebular/theme';
import { filter, map, Observable, of, Subscription, tap } from 'rxjs';
import { Category } from 'src/app/shared/model/category.model';
import { OfferShort } from 'src/app/shared/model/offer.model';
import { CategoryServiceService } from 'src/app/shared/services/category-service.service';
import { OfferService } from 'src/app/shared/services/offer.service';

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
    private router: Router,
    private offerService: OfferService,
    private categoryService: CategoryServiceService,
    private nbMenuService: NbMenuService,
    private nbScrollService: NbLayoutScrollService
  ) {}

  ngOnInit(): void {
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === this.categoryTag),
        map(({ item: { data } }) => data)
      )
      .subscribe((data) => this.selectCategory.emit(data));

    this.unsubSearch = this.categoryService.categories$.subscribe(result => {
      const categories = result.map((category) => {
        return { title: category.name, data: category };
      });

      this.categories = categories;
    });
  }

  goToHome(): void {
    this.nbScrollService.scrollTo(0, 0);
    this.clearSearch();
  }

  goToCreateOffer(): void {
    this.router.navigate(['create-offer']);
  }

  searchSuggestions(event:any) {
    if (event.target.value.length < 3) {
      this.filteredOptions$ = of([]);
      if(!!this.searchValue
        && this.searchValue !== event.target.value){
        this.router.navigate(['/']);
      }
      return;
    };

    this.filteredOptions$ = this.offerService.suggestions(event.target.value).pipe(
      tap(_ => event.target.click()),
      map(({result}) => result)
    );
  }

  searchOffers(): void {
    if(!!this.searchValue) {
      this.router.navigate(['/'], { queryParams: { q: this.searchValue } });
    } else {
      this.router.navigate(['/']);
    }
  }

  clearSearch(): void {
    this.filteredOptions$ = of([]);
    this.searchValue = '';
    this.router.navigate(['/']);
  }

  onSelectionChange(term:string) {
    if(!!term) {
      this.router.navigate(['/'], { queryParams: { q: term } });
    }
  }

  ngOnDestroy(): void {
    this.unsubSearch.unsubscribe();
  }
}
