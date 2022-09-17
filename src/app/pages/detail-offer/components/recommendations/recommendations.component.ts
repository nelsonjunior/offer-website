import { Component, Input} from '@angular/core';
import { map, Observable } from 'rxjs';
import { Recommendation } from 'src/app/shared/model/recommendation.model';
import { RecommendationService } from 'src/app/shared/services/recommendation.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss']
})
export class RecommendationsComponent {

  @Input()
  offerID!: string;

  recommendation$: Observable<Recommendation[]>;

  constructor(
    private recommendationService: RecommendationService
  ) {
    this.recommendation$ = this.recommendationService
      .getByOfferID(this.offerID);
  }

}
