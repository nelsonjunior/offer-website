import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/model/category.model';
import { FooterService } from 'src/app/shared/services/footer.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
})
export class TemplateComponent implements OnInit {

  footerVisibility$: Observable<boolean> = this.footerService.visible$.asObservable();

  constructor(
    private footerService: FooterService
  ) {}

  ngOnInit(): void {
  }

  onSelectCategory(category: Category): void {
    console.log(category);
  }

  hideFooter(): void {
    this.footerService.hide();
  }
}
