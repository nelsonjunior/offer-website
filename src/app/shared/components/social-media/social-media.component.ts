import { Component, OnInit } from '@angular/core';
import { faFacebookF, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { FooterService } from '../../services/footer.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  facebook = faFacebookF;
  instagram = faInstagram;
  twitter = faTwitter;
  linkedin = faLinkedin;
  mail = faEnvelope;
  shared = faShareNodes;

  constructor(
    private footerService: FooterService
  ) { }

  ngOnInit(): void {
  }

  showFooter(): void {
    this.footerService.show();
  }
}
