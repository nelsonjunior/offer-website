import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavegationBarService {

  searchTerm$ = new BehaviorSubject<string>('');

  constructor() { }

  setSearchTerm(term: string): void {
    this.searchTerm$.next(term);
  }
}
