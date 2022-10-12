import { Component, Input, OnInit } from '@angular/core';
import { Offer } from 'src/app/shared/model/offer.model';
import { faFire, faCommentDots } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-offer-detail',
  templateUrl: './card-offer-detail.component.html',
  styleUrls: ['./card-offer-detail.component.scss']
})
export class CardOfferDetailComponent implements OnInit {

  fireIcon = faFire;
  commentsIcon = faCommentDots;

  @Input()
  offer!: Offer;

  constructor() { }

  ngOnInit(): void {
  }

}
