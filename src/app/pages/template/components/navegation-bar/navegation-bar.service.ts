import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavegationBarService {

  searchTerm$ = new BehaviorSubject<string>('');

  constructor(
    private router: Router
  ) { }

  setSearchTerm(term: string): void {
    console.log('setSearchTerm', term);
    this.searchTerm$.next(term);
    if(!!term) {
      this.router.navigate(['/'], { queryParams: { q: term } });
    } else {
      this.router.navigate(['/']);
    }
  }

}
