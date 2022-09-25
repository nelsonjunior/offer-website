import { Component, Input } from '@angular/core';
import { Store } from 'src/app/shared/model/store.model';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.scss']
})
export class StoreInfoComponent {

  @Input()
  store!: Store

  constructor(
  ) { }

}
