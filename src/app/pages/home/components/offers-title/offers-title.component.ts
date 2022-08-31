import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-offers-title',
  templateUrl: './offers-title.component.html',
  styleUrls: ['./offers-title.component.scss']
})
export class OffersTitleComponent implements OnInit {

  selectedItemNgModel = 0;

  @Output() changeOrder: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedChange(order: number) {
    this.changeOrder.emit(order);
  }

}
