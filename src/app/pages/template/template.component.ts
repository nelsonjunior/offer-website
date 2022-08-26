import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuItem, NbSearchService } from '@nebular/theme';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, OnDestroy {

  categorias: NbMenuItem[] = [
    {
      title: 'Eletrônicos'
    },
    {
      title: 'Celulares'
    },
    {
      title: 'Eletrodomésticos'
    },
    {
      title: 'Games'
    },
    {
      title: 'Móveis'
    },
    {
      title: 'Informática'
    },
    {
      title: 'Esporte'
    }
  ];

  searchValue = '';

  unsubSearch!: Subscription;

  searchTerm$: Observable<any> = this.searchService.onSearchSubmit();

  constructor(
    private searchService: NbSearchService
  ) { }

  ngOnInit(): void {

  }

  openSearch() {

    this.searchService.activateSearch('rotate-layout');
  }

  ngOnDestroy(): void {
    this.unsubSearch.unsubscribe();
  }

}
