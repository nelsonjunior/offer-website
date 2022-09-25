import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { catchError, of } from 'rxjs';
import { Store } from 'src/app/shared/model/store.model';
import { StoreService } from 'src/app/shared/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  store: Store = this.activatedRoute.snapshot.data['store'];

  latitude = -15.7801;
  longitude = -47.9292;

  formStore: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private toastrService: NbToastrService,
    private fb: FormBuilder
  ){

    if(!!this.store.latitude && !!this.store.longitude) {
      this.latitude = this.store.latitude;
      this.longitude = this.store.longitude;
    } else {
      this.store.latitude = this.latitude;
      this.store.longitude = this.longitude;
    }

    this.formStore = this.fb.group({
      storeID: [{
        value: this.store.storeID,
        disabled: true
      }],
      name: [this.store.name, Validators.required],
      description: [this.store.description, Validators.required],
      image: [this.store.image],
      latitude: [this.store.latitude, Validators.required],
      longitude: [this.store.longitude, Validators.required]
    });
  }

  ngOnInit(): void {

    console.log('ProfileComponent.ngOnInit()', this.store);


    if(this.store.status === 'INACTIVE') {

      this.toastrService
        .warning('Você precisa completar o cadastro da sua loja para publicar uma oferta', 'Loja inativa');

    }
  }

  onUpdateMap(): void {
    console.log('ProfileComponent.onUpdateMap()', this.store);

    this.latitude = this.formStore.value.latitude;
    this.longitude = this.formStore.value.longitude;
  }

  onCancel(): void {
    this.formStore.controls['storeID'].setValue(this.store.storeID);
    this.formStore.controls['name'].setValue(this.store.name);
    this.formStore.controls['description'].setValue(this.store.description);
    this.formStore.controls['image'].setValue(this.store.image);
    this.formStore.controls['latitude'].setValue(this.store.latitude);
    this.formStore.controls['longitude'].setValue(this.store.longitude);

    this.latitude = -15.7801;
    this.longitude = -47.9292;
  }

  onUpdate(): void {
    console.log('ProfileComponent.onUpdate()', this.formStore.value);

    const updateStore = {...this.store, ...this.formStore.value};

    this.storeService.update(updateStore)
    .pipe(
      catchError(({error}) => {
        error.message.forEach((msg: string) => {
          this.toastrService.danger(msg, 'Erro');
        });
        return of(null);
      }
    )).subscribe((store) => {
      if(!!store) {
        this.toastrService.success(`Store ${store.name} atualizada com sucesso!`, 'Sucesso');
      }
    });
  }

  getMapURL(): string {
    return `https://www.google.com/maps/embed/v1/place?key=${environment.mapKey}&q=${this.latitude},${this.longitude}`;
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
