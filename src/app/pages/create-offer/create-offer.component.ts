import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BehaviorSubject, catchError, combineLatestWith, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { Category } from 'src/app/shared/model/category.model';
import { CreateOffer, OfferImage } from 'src/app/shared/model/offer.model';
import { CategoryServiceService } from 'src/app/shared/services/category-service.service';
import { OfferService } from 'src/app/shared/services/offer.service';
import { UploadImageService } from 'src/app/shared/services/upload-image.service';
import FormsUtils from 'src/app/shared/utils/forms.util';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.scss']
})
export class CreateOfferComponent implements OnInit {

  store = {
    storeID: '6310325be99f8832684c1f4d',
    name: 'Super Cell',
  };

  categories$: Observable<Category[]> = this.categoryService.categories$;

  files: OfferImage[] = [];

  formCreateOffer: FormGroup;

  stepDescriptionIncomplete$: Observable<string> = of('basic');

  stepCategoryIncomplete$: Observable<string> = of('basic');

  stepDateRangeIncomplete$: Observable<string> = of('basic');

  stepPriceOfferIncomplete$: Observable<string> = of('basic');

  stepAdditionalInfoIncomplete$: Observable<string> = of('basic');

  photosStatus =  new BehaviorSubject<string>('basic');

  stepPhotosIncomplete$ = this.photosStatus.asObservable();

  invalidUpload: boolean = false;

  uploadLoading = false;

  constructor(
    private categoryService: CategoryServiceService,
    private toastrService: NbToastrService,
    private offerService: OfferService,
    private router: Router,
    private fb: FormBuilder,
    private uploadImageService: UploadImageService
  ) {
    this.formCreateOffer = this.fb.group({
      description: ['', Validators.required],
      category: [null, Validators.required],
      dateRange: [null],
      additionalInformation: ['', Validators.required],
      price: [null, Validators.required],
      lastPrice: [null, Validators.required],
    });
  }

  ngOnInit(): void {

    this.stepDescriptionIncomplete$ = this.formCreateOffer.controls?.['description'].valueChanges.pipe(
      map((value) => !!value ? 'success' : 'basic')
    );

    this.stepCategoryIncomplete$ = this.formCreateOffer.controls?.['category'].valueChanges.pipe(
      map((value) => !!value ? 'success' : 'basic')
    );

    this.stepDateRangeIncomplete$ = this.formCreateOffer.controls?.['dateRange'].valueChanges.pipe(
      map((rage) => {
        if (!rage) return 'basic';
        const {start, end} = rage;
        return !!start && !!end ? 'success' : 'basic'}
      )
    );

    this.stepPriceOfferIncomplete$ = this.formCreateOffer.controls?.['price'].valueChanges.pipe(
      combineLatestWith(this.formCreateOffer.controls?.['lastPrice'].valueChanges),
        map(([price, lastPrice]) => {return !!price && !!lastPrice ? 'success' : 'basic'})
    );

    this.stepAdditionalInfoIncomplete$ = this.formCreateOffer.controls?.['additionalInformation'].valueChanges.pipe(
      map((value) => !!value ? 'success' : 'basic')
    );
  }

  onCleanRangeDate() {
    this.formCreateOffer.controls?.['dateRange'].reset();
  }

  onSelect(event: any) {
    this.uploadLoading = true;

    if(event.rejectedFiles.length > 0) {
      this.toastrService.danger('Tamanho máximo de arquivo é 2MB', 'Arquivo muito grande');
    }

    const file = event.addedFiles[0];
    this.uploadImageService.uploadFile(file).pipe(
      catchError(() => {
        this.toastrService.danger('Erro ao fazer upload da imagem', 'Erro');
        return of(null);
      })
    ).subscribe((url) => {

      if(!!url){
        this.files.push(url);
      }

      this.photosStatus.next(this.files.length > 0 ? 'success' : 'basic');
      this.uploadLoading = false;
      this.validateUpload();
    });

	}

	onRemove(event: any) {
		this.files.splice(this.files.indexOf(event), 1);
    this.photosStatus.next(this.files.length > 0 ? 'success' : 'basic');
    this.validateUpload();
	}

  validateUpload() {
    this.files.length === 0 ? this.invalidUpload = true : this.invalidUpload = false;
  }

  onPublish() {

    this.validateUpload();
    FormsUtils.markAllControlsAsDirty(Object.values(this.formCreateOffer.controls));

    if(this.formCreateOffer.valid && this.files.length > 0) {

      const offer: CreateOffer = {
        description: this.formCreateOffer.controls?.['description'].value,
        category: this.formCreateOffer.controls?.['category'].value,
        additionalInformation: this.formCreateOffer.controls?.['additionalInformation'].value,
        price: this.formCreateOffer.controls?.['price'].value,
        lastPrice: this.formCreateOffer.controls?.['lastPrice'].value,
        datePublish: this.formCreateOffer.controls?.['dateRange'].value?.start,
        dateExpire: this.formCreateOffer.controls?.['dateRange'].value?.end,
        store: this.store,
        images: this.files.map((file) => file.fileName)
      };

      this.offerService.publish(offer)
      .pipe(
        catchError(({error}) => {
          error.details.forEach((detail: string) => {
            this.toastrService.danger(detail, 'Erro');
          });
          return of(null);
        }
      )).subscribe((offer) => {
        if(!!offer) {
          this.toastrService.success(`Oferta ${offer.description} publicada com sucesso`, 'Sucesso');
          this.router.navigate(['/my-offers']);

        }
      });

    } else {
      this.toastrService.danger('Preencha todos os campos', 'Erro');
    }
  }

  onReset() {
    this.formCreateOffer.reset();
    this.files = [];
    this.photosStatus.next('basic');
    this.invalidUpload = false;
  }

  getErroMessage(control: AbstractControl | null): string {
    return !!control?.errors ? 'Campo obrigatório' : '';
  }

  getStatusInput(control: AbstractControl | null): string {
    return !control?.dirty || control?.valid ? 'basic' : 'danger';
  }

  showErrosInput(control: AbstractControl | null): boolean {
    return !!control?.dirty && !control?.valid;
  }

}
