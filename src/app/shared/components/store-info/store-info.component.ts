import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from 'src/app/shared/model/store.model';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-store-info',
  templateUrl: './store-info.component.html',
  styleUrls: ['./store-info.component.scss']
})
export class StoreInfoComponent implements OnInit {

  @Input()
  storeID!: string

  storeDetail$!: Observable<Store>;

  constructor(
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.storeDetail$ = this.storeService.getByID(this.storeID);
  }

}
