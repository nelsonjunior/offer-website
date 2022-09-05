import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogService, NbToastrService, NbWindowService } from '@nebular/theme';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { filter, map, Observable, of, ReplaySubject, switchMap } from 'rxjs';
import { Offer } from 'src/app/shared/model/offer.model';
import { OfferService } from 'src/app/shared/services/offer.service';
import { WindowDetailOfferComponent } from './components/window-detail-offer/window-detail-offer.component';

@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.scss']
})
export class MyOffersComponent implements OnInit {

  storeID = '631333b324b94db26b29e2c';

  searchValue: string = '';

  search = new ReplaySubject<string>();

  @ViewChild('dialog')
  dialog!: TemplateRef<any>;

  columns: Columns[] = [
    { key: 'description', title: 'Titulo', width: '70%' },
    { key: 'status', title: 'Status', width: '20%' },
    { key: '', title: 'Ações', width: '10%' }
  ];

  offers$:Observable<any> = of([]);

  configuration: Config = { ...DefaultConfig,
    paginationRangeEnabled: false,
    showDetailsArrow: true,
    rows: 5,

  };;

  constructor(
    private offerService: OfferService,
    private dialogService: NbDialogService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {

    this.offers$ = this.search.asObservable().pipe(
      switchMap((search) => {return this.offerService.list(1, 5, {term: search})}),
      map((response) => response.result)
    );

    this.searchOffers();
  }

  searchOffers(): void {

    this.search.next(this.searchValue);
  }

  clearSearch(): void {
    this.searchValue = '';
    this.search.next('');
  }

  onDelete(offer: Offer): void {
    const dialogRef = this.dialogService.open(this.dialog, { context: offer });
    dialogRef.onClose
      .pipe(filter((result) => !!result))
      .subscribe((offerConfirm) => this.confirmDelete(offerConfirm));
  }

  confirmDelete(offer: Offer): void {
    this.offerService.delete(offer.id).subscribe(
      () => {
        this.toastrService.success(`Oferta ${offer.description} excluída com sucesso`, 'Sucesso');
        this.searchOffers();
      }
    )
  }

  onDetail(offer: Offer) {
    this.offerService.getBySlug(offer.slug)
      .subscribe((offerDetail) => {
        this.windowService.open(WindowDetailOfferComponent, {
          title: `Detalhes da Oferta ${offerDetail.description}`,
          buttons: {
            minimize: false,
            maximize: false,
            fullScreen: false
          },
          context: offerDetail
        });
    });
  }

  onEdit(offer: Offer): void {
    console.log('onEdit', offer);
  }

}