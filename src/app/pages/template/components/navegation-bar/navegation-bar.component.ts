import {
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NbLayoutScrollService, NbMenuItem, NbMenuService } from '@nebular/theme';
import { filter, map, Observable, of, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
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

  mobileProfileOptions: NbMenuItem[] = [
    {
      title: 'Publicar',
      icon: 'plus'
    },
    {
      title: 'Perfil',
      icon: 'person-outline',
    },
    {
      title: 'Minhas Ofertas',
      icon: 'list-outline'
    },
    {
      title: 'Sair',
      icon: 'log-out-outline'
    },
  ];

  defaultProfileOptions: NbMenuItem[] = [
    {
      title: 'Perfil',
      icon: 'person-outline',
    },
    {
      title: 'Minhas Ofertas',
      icon: 'list-outline'
    },
    {
      title: 'Sair',
      icon: 'log-out-outline'
    },
  ];

  profileOptions: NbMenuItem[] = this.defaultProfileOptions;

  searchValue: string = '';

  unsubSearch!: Subscription;

  filteredOptions$: Observable<OfferShort[]> = of([]);

  authenticated$ = this.authService.authenticated$;

  categoryTag = 'category-context-menu';

  profileTag = 'profile-context-menu';

  mobile = false;

  constructor(
    private router: Router,
    private offerService: OfferService,
    private categoryService: CategoryServiceService,
    private nbMenuService: NbMenuService,
    private nbScrollService: NbLayoutScrollService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {

    if (window.innerWidth <= 768) {
      this.mobile = true;
    }

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

    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === this.profileTag),
        map(({ item: { title } }) => title)
      ).subscribe((title) => {
          switch (title) {
            case 'Publicar':
              this.router.navigate(['create-offer']);
              break;
            case 'Perfil':
              this.router.navigate(['profile']);
              break;
            case 'Minhas Ofertas':
              this.router.navigate(['my-offers']);
              break;
            case 'Sair':
              this.authService.logout();
              break;
          }
        }
      );
  }

  @HostListener('window:resize')
  onResize() {
    this.mobile = window.innerWidth <= 768;
  }

  hoverMenu(): void {

    this.profileOptions = window.innerWidth <= 768
      ? this.mobileProfileOptions : this.defaultProfileOptions;

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

  openLogin(): void {
    this.authService.openLogin();
  }

  ngOnDestroy(): void {
    this.unsubSearch.unsubscribe();
  }
}
