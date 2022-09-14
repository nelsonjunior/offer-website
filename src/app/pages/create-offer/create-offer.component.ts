import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BehaviorSubject, combineLatestWith, map, Observable, of } from 'rxjs';
import { Category } from 'src/app/shared/model/category.model';
import { CreateOffer } from 'src/app/shared/model/offer.model';
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

  storeID = '631333b324b94db26b29e2c';

  categories$: Observable<Category[]> = this.categoryService.categories$;

  files: File[] = [];

  formCreateOffer: FormGroup;

  stepDescriptionIncomplete$: Observable<string> = of('basic');

  stepCategoryIncomplete$: Observable<string> = of('basic');

  stepDateRangeIncomplete$: Observable<string> = of('basic');

  stepPriceOfferIncomplete$: Observable<string> = of('basic');

  stepAdditionalInfoIncomplete$: Observable<string> = of('basic');

  photosStatus =  new BehaviorSubject<string>('basic');

  stepPhotosIncomplete$ = this.photosStatus.asObservable();

  invalidUpload: boolean = false;

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
      dateRange: [null, Validators.required],
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

    if(event.rejectedFiles.length > 0) {
      this.toastrService.danger('Tamanho máximo de arquivo é 2MB', 'Arquivo muito grande');
    }


    console.log('onSelect', event);

		this.files.push(...event.addedFiles);

    this.uploadImageService.uploadFile(event.addedFiles[0])
    .subscribe((res: any) => {
      console.log('res', res);
    });

    this.photosStatus.next(this.files.length > 0 ? 'success' : 'basic');
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

      const {start, end} = this.formCreateOffer.controls?.['dateRange'].value;

      const offer: CreateOffer = {
        description: this.formCreateOffer.controls?.['description'].value,
        category: this.formCreateOffer.controls?.['category'].value,
        additionalInformation: this.formCreateOffer.controls?.['additionalInformation'].value,
        price: this.formCreateOffer.controls?.['price'].value,
        lastPrice: this.formCreateOffer.controls?.['lastPrice'].value,
        datePublish: start,
        dateExpire: end,
        storeID: this.storeID,
        photos: this.files
      };

      this.offerService.publish(offer).subscribe(
        (offer) => {
          this.toastrService.success(`Oferta ${offer.description} publicada com sucesso`, 'Sucesso');
          this.router.navigate(['/my-offers']);
        }
      )

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
