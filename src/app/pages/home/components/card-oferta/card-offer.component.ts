import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Offer } from 'src/app/shared/model/offer.model';
import { faFire, faCommentDots } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-card-offer',
  templateUrl: './card-offer.component.html',
  styleUrls: ['./card-offer.component.scss']
})
export class CardOfferComponent implements OnInit {

  fireIcon = faFire;
  commentsIcon = faCommentDots;

  @Input()
  offer!: Offer;

  @Output()
  clickCard = new EventEmitter<Offer>();

  constructor() { }

  ngOnInit(): void {
  }

  onClickCard(): void {
    this.clickCard.emit(this.offer);
  }

}