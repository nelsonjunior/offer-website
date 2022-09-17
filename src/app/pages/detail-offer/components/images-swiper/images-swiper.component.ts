import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';

import SwiperCore, { Keyboard, Pagination, Navigation, Virtual, Zoom, Autoplay } from 'swiper';

SwiperCore.use([Keyboard, Pagination, Navigation, Virtual, Zoom, Autoplay]);

@Component({
  selector: 'app-images-swiper',
  templateUrl: './images-swiper.component.html',
  styleUrls: ['./images-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImagesSwiperComponent implements OnInit {

  @Input()
  images!: string[];

  @Input()
  offerID!: string;

  constructor() { }

  ngOnInit(): void {

  }

  getUrlImage(image: string): string {
    return `${environment.images_bucket}/${this.offerID}/${image}`;
  }

}
