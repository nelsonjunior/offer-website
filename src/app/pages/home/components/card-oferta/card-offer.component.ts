import { Component, Input, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
  }

}
