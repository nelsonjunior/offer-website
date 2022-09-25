import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import FormsUtils from 'src/app/shared/utils/forms.util';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup;

  @ViewChild('dialog')
  dialog!: TemplateRef<any>;

  confirmationCode: string = '';

  confirmationCodeMessage: string = '';

  registerError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastrService: NbToastrService,
    private dialogService: NbDialogService
  ) {
    this.formRegister = this.fb.group({
      storeName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberUser: [false]
    });
  }

  ngOnInit(): void {
  }

  onRegister(): void {

    console.log('onRegister', this.formRegister.value);

    FormsUtils.markAllControlsAsDirty(Object.values(this.formRegister.controls));


    if(this.formRegister.valid) {


      const user = {
        name: this.formRegister.value.storeName,
        email: this.formRegister.value.email,
        password: this.formRegister.value.password
      };

      this.authService.signUp(user)
      .then(() => {

        this.authService.closeLastWindow();

        this.dialogService.open(this.dialog, {
          closeOnBackdropClick: false,
          closeOnEsc: false,
          context: {
            user: user
          }
        });

      })
      .catch((error) => {

        this.registerError = error.message;
        this.toastrService.danger(error.message, 'Erro');
      });
    }

  }

  onCloseConfirmationCode(ref: NbDialogRef<any>, data: any): void {
    console.log('onCloseConfirmationCode', this.confirmationCode);
    this.confirmationCodeMessage = 'Erro ao confirmar código';

    this.authService.confirmSignUp(data.user.email, this.confirmationCode)
    .then(() => {
      this.authService.login(data.user);
      ref.close();
    })
    .catch((error) => {
      this.confirmationCodeMessage = error.message;
      this.toastrService.danger(error.message, 'Erro');
    });

  }


  onLogin(): void {
    this.authService.openLogin();
  }

  getErroMessage(control: AbstractControl | null): string {
    return !!control?.errors ? 'Campo obrigatório' : '';
  }

  getStatusInput(control: AbstractControl | null): string {
    return !this.registerError && (!control?.dirty || control?.valid) ? 'basic' : 'danger';
  }

  showErrosInput(control: AbstractControl | null): boolean {
    return !!control?.dirty && !control?.valid;
  }

}
