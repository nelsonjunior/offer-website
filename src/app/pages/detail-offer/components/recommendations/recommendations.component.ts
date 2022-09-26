import { Component, Input, OnInit} from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Offer } from 'src/app/shared/model/offer.model';
import { Recommendation } from 'src/app/shared/model/recommendation.model';
import { OfferService } from 'src/app/shared/services/offer.service';
import { RecommendationService } from 'src/app/shared/services/recommendation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent implements OnInit {

  @Input()
  description!: string;

  recommendation$: Observable<Recommendation[]> = of([]);

  constructor(
    private recommendationService: RecommendationService,
    private offertService: OfferService
  ) {

  }
  ngOnInit(): void {

    console.log('recovery recommendations', this.description);

    this.recommendation$ = this.offertService
    .search(1, 5, { term: this.description })
    .pipe(
      map((response) => response.result),
      map((offers) => {
        return offers.map((offer) => {
          return {
            offerID: offer.offerID,
            description: offer.description,
            image: offer.images[0],
            price: offer.price,
            slug: offer.slug
          } as Recommendation
        })
      }
    ));
  }


  getUrlImage(recommendation: Recommendation): string {
    return `${environment.images_bucket}/${recommendation.offerID}/${recommendation.image}`;
  }

}
