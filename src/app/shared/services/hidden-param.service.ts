import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HiddenParamService {

  private hiddenParam$ = new BehaviorSubject(null);

  constructor() { }

  setParam(param: any) {
    this.hiddenParam$.next(param);
  }

  get currentParam() {

    const currentParam = this.hiddenParam$.value;

    this.hiddenParam$.next(null);

    return currentParam;
  }

}
